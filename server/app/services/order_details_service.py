"""
Order Details service.
"""
from typing import Dict, Any, Optional
from datetime import datetime, timedelta
from app.services.pocketbase_service import get_pocketbase_service
from app.models.order_details import OrderDetailItem, OrderDetailsResponse


class OrderDetailsService:
    """Service for handling Order Details operations."""
    
    COLLECTION_NAME = "OCCDUBAI01_jobDetails"
    
    def get_order_details(
        self,
        from_date: Optional[str] = None,
        to_date: Optional[str] = None,
        page: int = 1,
        per_page: int = 50
    ) -> Dict[str, Any]:
        """
        Get order details from PocketBase with date filtering and pagination.
        
        Args:
            from_date: Start date filter (YYYY-MM-DD)
            to_date: End date filter (YYYY-MM-DD)
            page: Page number (1-indexed)
            per_page: Items per page
        
        Returns:
            Dictionary with paginated order details
        """
        pb_service = get_pocketbase_service()
        
        # Build date filter
        date_filter = pb_service.build_date_filter("created", from_date, to_date)
        
        # Fetch data from PocketBase
        result = pb_service.fetch_collection(
            collection_name=self.COLLECTION_NAME,
            filter_query=date_filter,
            page=page,
            per_page=per_page,
            sort="-created"
        )
        
        # Map PocketBase records to OrderDetailItem format
        items = []
        for record in result["items"]:
            item = OrderDetailItem(
                jobNumber=record.get("jobNumber"),
                soNumber=record.get("soNumber"),
                soLineNumber=record.get("soLineNumber"),
                drawingTag=record.get("drawingTag"),
                jobQty=record.get("jobQty"),
                jobStatus=record.get("jobStatus")
            )
            items.append(item)
        
        return {
            "items": items,
            "page": result["page"],
            "perPage": result["perPage"],
            "totalItems": result["totalItems"],
            "totalPages": result["totalPages"]
        }
    
    def get_default_date_range(self) -> tuple[str, str]:
        """
        Get default date range (last 7 days).
        
        Returns:
            Tuple of (from_date, to_date) in YYYY-MM-DD format
        """
        today = datetime.now()
        week_ago = today - timedelta(days=7)
        
        return (
            week_ago.strftime("%Y-%m-%d"),
            today.strftime("%Y-%m-%d")
        )

