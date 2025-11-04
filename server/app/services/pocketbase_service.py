"""
PocketBase service for reusable database operations.
"""
from typing import Optional, Dict, Any, List
from datetime import datetime, timedelta
import logging
import requests
from pocketbase import PocketBase
from app.config import settings

logger = logging.getLogger(__name__)


class PocketBaseService:
    """Service for interacting with PocketBase database."""
    
    def __init__(self):
        """Initialize PocketBase service."""
        self._client: Optional[PocketBase] = None
        self._auth_token: Optional[str] = None
    
    def _get_client(self) -> PocketBase:
        """Get or create PocketBase client."""
        if not self._client:
            if not settings.POCKETBASE_URL:
                raise ValueError("POCKETBASE_URL not configured")
            self._client = PocketBase(settings.POCKETBASE_URL)
        return self._client
    
    def authenticate(self) -> str:
        """Authenticate with PocketBase and return auth token."""
        if self._auth_token:
            return self._auth_token
        
        client = self._get_client()
        
        email = settings.POCKETBASE_ADMIN_EMAIL or settings.POCKETBASE_EMAIL
        password = settings.POCKETBASE_ADMIN_PASSWORD or settings.POCKETBASE_PASSWORD
        
        if not email or not password:
            raise ValueError("PocketBase credentials not configured")
        
        try:
            auth_data = client.admins.auth_with_password(email, password)
            self._auth_token = auth_data.token
            logger.info("Successfully authenticated with PocketBase")
            return self._auth_token
        except Exception as e:
            logger.error(f"Failed to authenticate with PocketBase: {str(e)}")
            raise
    
    def fetch_collection(
        self,
        collection_name: str,
        filter_query: Optional[str] = None,
        page: int = 1,
        per_page: int = 500,
        sort: str = "-created"
    ) -> Dict[str, Any]:
        """
        Fetch data from PocketBase collection with pagination and filtering.
        
        Args:
            collection_name: Name of the collection
            filter_query: Optional filter query string
            page: Page number (1-indexed)
            per_page: Number of items per page
            sort: Sort order (default: "-created")
        
        Returns:
            Dictionary with items, page, perPage, totalItems, totalPages
        """
        self.authenticate()
        
        if not settings.POCKETBASE_URL:
            raise ValueError("POCKETBASE_URL not configured")
        
        try:
            # Use direct HTTP requests since SDK's get_list() doesn't support filter parameter properly
            headers = {
                "Authorization": f"Bearer {self._auth_token}",
                "Content-Type": "application/json"
            }
            
            # Build query parameters - PocketBase REST API uses camelCase
            params = {
                "page": page,
                "perPage": per_page,
                "sort": sort
            }
            
            if filter_query:
                params["filter"] = filter_query
            
            # Make direct HTTP request to PocketBase API
            url = f"{settings.POCKETBASE_URL}/api/collections/{collection_name}/records"
            response = requests.get(url, headers=headers, params=params, timeout=30)
            response.raise_for_status()
            
            data = response.json()
            
            return {
                "items": data.get("items", []),
                "page": data.get("page", 1),
                "perPage": data.get("perPage", per_page),
                "totalItems": data.get("totalItems", 0),
                "totalPages": data.get("totalPages", 0)
            }
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching collection {collection_name}: {str(e)}")
            raise
        except Exception as e:
            logger.error(f"Error fetching collection {collection_name}: {str(e)}")
            raise
    
    def build_date_filter(self, field: str, from_date: Optional[str] = None, to_date: Optional[str] = None) -> Optional[str]:
        """
        Build PocketBase date filter query.
        
        Args:
            field: Field name to filter on
            from_date: Start date (ISO format or YYYY-MM-DD)
            to_date: End date (ISO format or YYYY-MM-DD)
        
        Returns:
            Filter query string or None
        """
        filters = []
        
        if from_date:
            # Ensure date is in correct format
            try:
                datetime.fromisoformat(from_date.replace('Z', '+00:00'))
            except ValueError:
                # If not ISO format, assume YYYY-MM-DD
                from_date = f"{from_date}T00:00:00.000Z"
            
            filters.append(f'{field} >= "{from_date}"')
        
        if to_date:
            try:
                datetime.fromisoformat(to_date.replace('Z', '+00:00'))
            except ValueError:
                # If not ISO format, assume YYYY-MM-DD, set to end of day
                to_date = f"{to_date}T23:59:59.999Z"
            
            filters.append(f'{field} <= "{to_date}"')
        
        if filters:
            return " && ".join(filters)
        
        return None


# Global service instance
_pocketbase_service: Optional[PocketBaseService] = None


def get_pocketbase_service() -> PocketBaseService:
    """Get the global PocketBase service instance."""
    global _pocketbase_service
    if not _pocketbase_service:
        _pocketbase_service = PocketBaseService()
    return _pocketbase_service
