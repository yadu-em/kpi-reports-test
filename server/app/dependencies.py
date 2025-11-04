"""
Application dependencies and shared resources.
"""
from pocketbase import PocketBase
from typing import Optional
import logging
from app.config import settings

logger = logging.getLogger(__name__)

# Global PocketBase client instance
_pocketbase_client: Optional[PocketBase] = None


def get_pocketbase_client() -> Optional[PocketBase]:
    """Get the global PocketBase client instance."""
    return _pocketbase_client


def init_pocketbase() -> None:
    """Initialize PocketBase connection and create collections if needed."""
    global _pocketbase_client
    
    if not all([settings.POCKETBASE_URL, settings.POCKETBASE_EMAIL, settings.POCKETBASE_PASSWORD]):
        logger.warning("PocketBase credentials not configured. Skipping initialization.")
        return
    
    try:
        _pocketbase_client = PocketBase(settings.POCKETBASE_URL)
        # Authenticate admin
        _pocketbase_client.admins.auth_with_password(
            settings.POCKETBASE_EMAIL,
            settings.POCKETBASE_PASSWORD
        )
        
        # Initialize collections
        _init_collections()
        
        logger.info("PocketBase initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize PocketBase: {str(e)}")
        _pocketbase_client = None


def _init_collections() -> None:
    """Initialize required PocketBase collections."""
    if not _pocketbase_client:
        return
    
    try:
        collections = _pocketbase_client.collections.get_full_list()
        collection_exists = any(col.name == "kpi_reports" for col in collections)
        
        if not collection_exists:
            collection_data = {
                "name": "kpi_reports",
                "type": "base",
                "schema": [
                    {
                        "name": "title",
                        "type": "text",
                        "required": True
                    },
                    {
                        "name": "value",
                        "type": "number",
                        "required": True
                    },
                    {
                        "name": "date",
                        "type": "date",
                        "required": True
                    }
                ]
            }
            _pocketbase_client.collections.create(collection_data)
            logger.info("Created kpi_reports collection")
        else:
            logger.info("kpi_reports collection already exists")
    except Exception as e:
        logger.info(f"Collection check/creation: {str(e)}")

