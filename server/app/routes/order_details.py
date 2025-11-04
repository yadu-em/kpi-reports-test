"""
Route handlers for order details endpoints.
"""
from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from datetime import datetime, timedelta
from app.services.order_details_service import OrderDetailsService
from app.models.order_details import OrderDetailsResponse

router = APIRouter(prefix="/order-details", tags=["order-details"])


@router.get("", response_model=OrderDetailsResponse)
async def get_order_details(
    from_date: Optional[str] = Query(None, description="Start date (YYYY-MM-DD)"),
    to_date: Optional[str] = Query(None, description="End date (YYYY-MM-DD)"),
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(50, ge=1, le=500, description="Items per page")
) -> OrderDetailsResponse:
    """
    Get order details with date filtering and pagination.
    
    If no dates are provided, defaults to last 7 days.
    
    Returns:
        Paginated order details response
    """
    try:
        service = OrderDetailsService()
        
        # If no dates provided, use default (last 7 days)
        if not from_date or not to_date:
            default_from, default_to = service.get_default_date_range()
            from_date = from_date or default_from
            to_date = to_date or default_to
        
        result = service.get_order_details(
            from_date=from_date,
            to_date=to_date,
            page=page,
            per_page=per_page
        )
        
        return OrderDetailsResponse(**result)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch order details: {str(e)}")

