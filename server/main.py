from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from pocketbase import PocketBase
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="KPI Reports API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize PocketBase client
POCKETBASE_URL = os.getenv("POCKETBASE_URL")
POCKETBASE_EMAIL = os.getenv("POCKETBASE_EMAIL")
POCKETBASE_PASSWORD = os.getenv("POCKETBASE_PASSWORD")

pb = None

# Initialize PocketBase connection
def init_pocketbase():
    global pb
    try:
        pb = PocketBase(POCKETBASE_URL)
        # Authenticate admin
        pb.admins.auth_with_password(POCKETBASE_EMAIL, POCKETBASE_PASSWORD)
        
        # Initialize collection if it doesn't exist
        try:
            # Try to get the collection
            collections = pb.collections.get_full_list()
            collection_exists = any(col.name == "kpi_reports" for col in collections)
            
            if not collection_exists:
                # Create collection
                collection_data = {
                    "name": "kpi_reports",
                    "type": "base",
                    "schema": [
                        {
                            "name": "title",
                            "type": "text",
                            "required": True
                        },
                        {
                            "name": "value",
                            "type": "number",
                            "required": True
                        },
                        {
                            "name": "date",
                            "type": "date",
                            "required": True
                        }
                    ]
                }
                pb.collections.create(collection_data)
                logging.info("Created kpi_reports collection")
            else:
                logging.info("kpi_reports collection already exists")
        except Exception as e:
            logging.info(f"Collection check/creation: {str(e)}")
            
        logging.info("PocketBase initialized successfully")
    except Exception as e:
        logging.error(f"Failed to initialize PocketBase: {str(e)}")
        pb = None

# Initialize on startup
@app.on_event("startup")
async def startup_event():
    init_pocketbase()

@app.get("/")
async def root():
    return {"message": "Hello from KPI Reports API!"}

@app.get("/health")
async def health():
    return {"status": "healthy", "pocketbase_connected": pb is not None}

