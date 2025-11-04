"""
Routes module initialization.
"""
from fastapi import APIRouter
from app.routes import health, sales

# Create main API router
api_router = APIRouter()

# Include route modules
api_router.include_router(health.router)
api_router.include_router(sales.router)

