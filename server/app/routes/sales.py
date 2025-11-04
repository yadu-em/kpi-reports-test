"""
Route handlers for sales endpoints.
"""
from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from app.services.sales_service import SalesService
from app.models import SalesData

router = APIRouter(prefix="/sales", tags=["sales"])


@router.get("", response_model=Dict[str, Any])
async def get_sales() -> Dict[str, Any]:
    """
    Get sales performance data.
    
    Returns:
        Sales performance metrics including total sales, growth, products, and regions.
    
    Raises:
        HTTPException: If data retrieval fails.
    """
    try:
        sales_service = SalesService()
        return sales_service.get_sales_data()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch sales data: {str(e)}")


@router.get("/typed", response_model=SalesData)
async def get_sales_typed() -> SalesData:
    """
    Get sales performance data as typed model.
    
    Returns:
        SalesData model instance.
    
    Raises:
        HTTPException: If data retrieval fails.
    """
    try:
        sales_service = SalesService()
        return sales_service.get_sales_data_typed()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch sales data: {str(e)}")

