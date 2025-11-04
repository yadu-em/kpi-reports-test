"""
Application configuration settings.
"""
from dotenv import load_dotenv
import os
from typing import Optional

# Load environment variables
load_dotenv()


class Settings:
    """Application settings loaded from environment variables."""
    
    # API Settings
    API_TITLE: str = "KPI Reports API"
    API_VERSION: str = "1.0.0"
    API_DESCRIPTION: str = "API for KPI Reports Dashboard"
    
    # CORS Settings
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:3001",
    ]
    
    # PocketBase Settings
    POCKETBASE_URL: Optional[str] = os.getenv("POCKETBASE_URL")
    POCKETBASE_EMAIL: Optional[str] = os.getenv("POCKETBASE_EMAIL")
    POCKETBASE_PASSWORD: Optional[str] = os.getenv("POCKETBASE_PASSWORD")
    
    # Server Settings
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    RELOAD: bool = True


settings = Settings()

