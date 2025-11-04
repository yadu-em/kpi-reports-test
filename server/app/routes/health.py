"""
Route handlers for health and root endpoints.
"""
from fastapi import APIRouter
from datetime import datetime
from app.models import HealthResponse, RootResponse
from app.dependencies import get_pocketbase_client
from app.config import settings

router = APIRouter(tags=["health"])


@router.get("/", response_model=RootResponse)
async def root() -> RootResponse:
    """
    Root endpoint.
    
    Returns:
        Welcome message and API version.
    """
    return RootResponse(
        message="Hello from KPI Reports API!",
        version=settings.API_VERSION
    )


@router.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    """
    Health check endpoint.
    
    Returns:
        Health status and PocketBase connection status.
    """
    pb_client = get_pocketbase_client()
    return HealthResponse(
        status="healthy",
        pocketbase_connected=pb_client is not None,
        timestamp=datetime.utcnow().isoformat() + "Z"
    )

