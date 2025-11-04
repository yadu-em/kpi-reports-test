# Backend - KPI Reports API

## Project Structure

```
server/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application entry point
│   ├── config.py             # Configuration settings
│   ├── dependencies.py      # Shared dependencies (PocketBase client)
│   ├── models/               # Pydantic data models
│   │   └── __init__.py
│   ├── routes/               # API route handlers (controllers)
│   │   ├── __init__.py
│   │   ├── health.py         # Health check routes
│   │   └── sales.py          # Sales data routes
│   └── services/             # Business logic layer
│       ├── __init__.py
│       └── sales_service.py  # Sales service
├── run.py                    # Development server runner
├── requirements.txt          # Python dependencies
└── .env                      # Environment variables (not in git)
```

## Architecture

### Layers

1. **Routes (Controllers)**: Handle HTTP requests/responses
   - Located in `app/routes/`
   - Define endpoints and request/response models
   - Call services for business logic

2. **Services**: Business logic layer
   - Located in `app/services/`
   - Contains business rules and data processing
   - Can interact with PocketBase or other data sources

3. **Models**: Data models
   - Located in `app/models/`
   - Pydantic models for request/response validation
   - Type-safe data structures

4. **Dependencies**: Shared resources
   - Located in `app/dependencies.py`
   - PocketBase client initialization
   - Shared utilities

5. **Config**: Configuration management
   - Located in `app/config.py`
   - Environment variables
   - Application settings

## Setup

1. Create virtual environment:
```bash
python -m venv venv
```

2. Activate virtual environment:
- Windows: `venv\Scripts\activate`
- Linux/Mac: `source venv/bin/activate`

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```env
POCKETBASE_URL=http://localhost:8090
POCKETBASE_EMAIL=your-email@example.com
POCKETBASE_PASSWORD=your-password
```

5. Run the server:
```bash
python run.py
```

The server will run on `http://localhost:8000`

## API Endpoints

- `GET /` - Root endpoint (welcome message)
- `GET /health` - Health check endpoint
- `GET /sales` - Get sales performance data
- `GET /sales/typed` - Get sales data as typed model

## Development

The application follows FastAPI best practices:
- Separation of concerns (routes, services, models)
- Type safety with Pydantic models
- Clean architecture with dependency injection
- Proper error handling
- Logging configuration
- Environment-based configuration

## Adding New Routes

1. Create a new file in `app/routes/` (e.g., `app/routes/products.py`)
2. Define your router with endpoints
3. Import and include in `app/routes/__init__.py`
4. The route will be automatically available

## Adding New Services

1. Create a new file in `app/services/` (e.g., `app/services/product_service.py`)
2. Implement business logic
3. Import and use in route handlers

## Best Practices

- Keep routes thin - delegate to services
- Use Pydantic models for validation
- Handle errors gracefully
- Use type hints throughout
- Follow PEP 8 style guide
- Document functions with docstrings

