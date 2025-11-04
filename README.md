# KPI Reports - Project Setup Guide

## Project Structure
- `frontend/` - React TypeScript frontend application (Vite)
- `server/` - FastAPI Python backend application

### Backend Structure
```
server/
├── app/
│   ├── main.py          # FastAPI application entry point
│   ├── config.py        # Configuration settings
│   ├── dependencies.py  # Shared dependencies
│   ├── models/          # Pydantic data models
│   ├── routes/          # API route handlers (controllers)
│   └── services/        # Business logic layer
├── run.py               # Development server runner
└── requirements.txt     # Python dependencies
```

## Setup Instructions

### 1. Backend Setup

Navigate to the server directory:
```bash
cd server
```

Create a virtual environment:
```bash
python -m venv venv
```

Activate the virtual environment:
- Windows: `venv\Scripts\activate`
- Linux/Mac: `source venv/bin/activate`

Install dependencies:
```bash
pip install -r requirements.txt
```

Create `.env` file:
```bash
# Copy env.template to .env if available, or create manually
```

Edit `.env` and add your PocketBase credentials:
- POCKETBASE_URL: Your PocketBase server URL
- POCKETBASE_EMAIL: Your PocketBase admin email
- POCKETBASE_PASSWORD: Your PocketBase admin password

Run the server:
```bash
python run.py
```

The server will run on `http://localhost:8000`

**Note:** The backend follows a clean architecture pattern with routes (controllers), services (business logic), and models (data structures).

### 2. Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

**Note:** The frontend has been migrated to Vite for faster development and better performance.

### 3. PocketBase Collection

The `kpi_reports` collection will be automatically created when the server starts if it doesn't exist. The collection schema includes:
- `title` (text, required)
- `value` (number, required)
- `date` (date, required)

## API Endpoints

- `GET /` - Returns a welcome message and API version
- `GET /health` - Health check endpoint with PocketBase connection status
- `GET /sales` - Get sales performance data
- `GET /sales/typed` - Get sales data as typed Pydantic model

## Frontend Features

- **Modern Stack**: React 18 with Vite for fast development
- **Routing**: React Router for navigation between reports
- **Responsive Design**: Mobile-friendly sidebar and layout
- **Color Theme**: Professional white and #e15a2d (coral orange) theme
- **Layout**: 1/4 sidebar width, 3/4 content area (responsive on mobile)

## Notes

- Make sure PocketBase is running before starting the backend server
- The frontend uses Vite's proxy configuration to forward API requests to `http://localhost:8000`
- The application includes a sidebar with reports list and a main content area for viewing reports
- Backend follows clean architecture: routes → services → models
- All endpoints are documented with OpenAPI/Swagger (available at `/docs` when server is running)

