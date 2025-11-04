"""
Data models for the application.
"""
from typing import Optional
from datetime import datetime
from pydantic import BaseModel


class ProductSales(BaseModel):
    """Product sales data model."""
    name: str
    sales: float
    growth: float


class RegionSales(BaseModel):
    """Region sales data model."""
    name: str
    sales: float
    target: float


class SalesData(BaseModel):
    """Sales performance data model."""
    total_sales: float
    monthly_growth: float
    top_products: list[ProductSales]
    regions: list[RegionSales]
    period: str
    last_updated: str


class HealthResponse(BaseModel):
    """Health check response model."""
    status: str
    pocketbase_connected: bool
    timestamp: Optional[str] = None


class RootResponse(BaseModel):
    """Root endpoint response model."""
    message: str
    version: str

