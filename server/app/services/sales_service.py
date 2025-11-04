"""
Sales service for business logic.
"""
from typing import Dict, Any
from datetime import datetime
from app.models import SalesData, ProductSales, RegionSales


class SalesService:
    """Service for handling sales data operations."""
    
    @staticmethod
    def get_sales_data() -> Dict[str, Any]:
        """
        Get sales performance data.
        
        Returns:
            Dict containing sales performance metrics.
        """
        # In production, this would fetch from PocketBase or another data source
        sales_data = {
            "total_sales": 1250000,
            "monthly_growth": 12.5,
            "top_products": [
                {"name": "Product A", "sales": 450000, "growth": 15.2},
                {"name": "Product B", "sales": 380000, "growth": 8.7},
                {"name": "Product C", "sales": 320000, "growth": 22.1},
                {"name": "Product D", "sales": 100000, "growth": -3.4},
            ],
            "regions": [
                {"name": "North", "sales": 420000, "target": 400000},
                {"name": "South", "sales": 380000, "target": 400000},
                {"name": "East", "sales": 280000, "target": 300000},
                {"name": "West", "sales": 170000, "target": 200000},
            ],
            "period": "Q4 2024",
            "last_updated": datetime.utcnow().isoformat() + "Z"
        }
        
        return sales_data
    
    @staticmethod
    def get_sales_data_typed() -> SalesData:
        """
        Get sales performance data as typed model.
        
        Returns:
            SalesData model instance.
        """
        data = SalesService.get_sales_data()
        return SalesData(**data)

