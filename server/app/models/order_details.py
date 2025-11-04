"""
Order Details models.
"""
from typing import Optional
from pydantic import BaseModel


class OrderDetailItem(BaseModel):
    """Individual order detail item."""
    jobNumber: Optional[str] = None
    soNumber: Optional[str] = None
    soLineNumber: Optional[str] = None
    drawingTag: Optional[str] = None
    jobQty: Optional[float] = None
    jobStatus: Optional[str] = None


class OrderDetailsResponse(BaseModel):
    """Order details response with pagination."""
    items: list[OrderDetailItem]
    page: int
    perPage: int
    totalItems: int
    totalPages: int

