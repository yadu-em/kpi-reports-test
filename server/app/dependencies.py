"""
Application dependencies and shared resources.
"""
from pocketbase import PocketBase
from typing import Optional
import logging
from app.config import settings

logger = logging.getLogger(__name__)

# Global PocketBase client instance (legacy - use PocketBaseService instead)
_pocketbase_client: Optional[PocketBase] = None


def get_pocketbase_client() -> Optional[PocketBase]:
    """Get the global PocketBase client instance (legacy)."""
    return _pocketbase_client


def init_pocketbase() -> None:
    """Initialize PocketBase connection (legacy - kept for health check)."""
    global _pocketbase_client
    
    email = settings.POCKETBASE_ADMIN_EMAIL or settings.POCKETBASE_EMAIL
    password = settings.POCKETBASE_ADMIN_PASSWORD or settings.POCKETBASE_PASSWORD
    
    if not all([settings.POCKETBASE_URL, email, password]):
        logger.warning("PocketBase credentials not configured. Skipping initialization.")
        return
    
    try:
        _pocketbase_client = PocketBase(settings.POCKETBASE_URL)
        # Authenticate admin
        _pocketbase_client.admins.auth_with_password(email, password)
        logger.info("PocketBase initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize PocketBase: {str(e)}")
        _pocketbase_client = None

