from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection with error handling
try:
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    db_name = os.environ.get('DB_NAME', 'vox_radio')
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    print(f"MongoDB connected to: {db_name}")
except Exception as e:
    print(f"MongoDB connection error: {e}")
    client = None
    db = None

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# VDO.Ninja Settings Management
@api_router.get("/vdo-ninja-settings")
async def get_vdo_ninja_settings():
    """Get VDO.Ninja settings"""
    try:
        if db is None:
            # Return default settings when DB is not available
            return {
                "vdoDirectorUrl": "",
                "vdoGuestUrl": "",
                "audioOnly": True,
                "proAudio": True,
                "cleanUI": True,
                "audioBitrateKbps": 128
            }
        
        settings = await db.vdo_ninja_settings.find_one({"type": "default"})
        if settings:
            return {
                "vdoDirectorUrl": settings.get("vdoDirectorUrl", ""),
                "vdoGuestUrl": settings.get("vdoGuestUrl", ""),
                "audioOnly": settings.get("audioOnly", True),
                "proAudio": settings.get("proAudio", True),
                "cleanUI": settings.get("cleanUI", True),
                "audioBitrateKbps": settings.get("audioBitrateKbps", 128)
            }
        else:
            return {
                "vdoDirectorUrl": "",
                "vdoGuestUrl": "",
                "audioOnly": True,
                "proAudio": True,
                "cleanUI": True,
                "audioBitrateKbps": 128
            }
    except Exception as e:
        logging.error(f"Error getting VDO.Ninja settings: {e}")
        return {
            "vdoDirectorUrl": "",
            "vdoGuestUrl": "",
            "audioOnly": True,
            "proAudio": True,
            "cleanUI": True,
            "audioBitrateKbps": 128
        }

@api_router.post("/vdo-ninja-settings")
async def save_vdo_ninja_settings(settings: dict):
    """Save VDO.Ninja settings"""
    try:
        if db is None:
            return {"message": "Settings saved (DB unavailable)", "success": False}
        
        # Prepare settings document
        settings_doc = {
            "type": "default",
            "vdoDirectorUrl": settings.get("vdoDirectorUrl", ""),
            "vdoGuestUrl": settings.get("vdoGuestUrl", ""),
            "audioOnly": settings.get("audioOnly", True),
            "proAudio": settings.get("proAudio", True),
            "cleanUI": settings.get("cleanUI", True),
            "audioBitrateKbps": settings.get("audioBitrateKbps", 128),
            "updated_at": datetime.now(timezone.utc)
        }
        
        # Replace existing settings or create new one
        await db.vdo_ninja_settings.replace_one(
            {"type": "default"},
            settings_doc,
            upsert=True
        )
        
        return {"message": "VDO.Ninja settings saved successfully", "success": True}
    except Exception as e:
        logging.error(f"Error saving VDO.Ninja settings: {e}")
        return {"message": "Error saving settings", "success": False}

@api_router.get("/")
async def root():
    return {"message": "Vox Radio Dashboard API", "status": "running"}

@api_router.get("/health")
async def health_check():
    try:
        # Test database connection
        if db is not None:
            await db.status_checks.find_one()
            db_status = "connected"
        else:
            db_status = "disconnected"
        
        return {
            "status": "healthy",
            "database": db_status,
            "timestamp": datetime.utcnow().isoformat()
        }
    except Exception as e:
        return {
            "status": "unhealthy",
            "database": "error",
            "error": str(e),
            "timestamp": datetime.utcnow().isoformat()
        }

@api_router.get("/server-time")
async def get_server_time():
    """
    Get current server time in UTC and Monrovia timezone
    Used to sync client clocks and avoid timezone issues
    """
    try:
        utc_now = datetime.utcnow()
        
        # Create timezone-aware datetime for Monrovia (UTC+0, same as UTC)
        monrovia_tz = timezone.utc  # Monrovia is UTC+0
        monrovia_now = utc_now.replace(tzinfo=monrovia_tz)
        
        return {
            "utc": utc_now.isoformat() + "Z",
            "monrovia": monrovia_now.isoformat(),
            "timezone": "Africa/Monrovia",
            "offset": "+00:00"
        }
    except Exception as e:
        logging.error(f"Error getting server time: {e}")
        return {
            "error": "Failed to get server time",
            "utc": datetime.utcnow().isoformat() + "Z",
            "monrovia": datetime.utcnow().isoformat() + "Z",
            "timezone": "Africa/Monrovia",
            "offset": "+00:00"
        }

# Cleanfeed Settings Management
@api_router.get("/cleanfeed-settings")
async def get_cleanfeed_settings():
    """Get Cleanfeed public settings (excludes secrets)"""
    try:
        if db is None:
            return {
                "cleanfeedGuestUrl": "https://cleanfeed.net/k?iUc5ijKCFYUj",
                "presenterInstructions": """You're invited to join our live broadcast on Cleanfeed.
1) Click this guest link: {{cleanfeedGuestUrl}}
2) When the page opens, click "Start" and allow microphone access.
3) Use headphones (no speakers) to avoid echo.
4) Use Chrome or Edge on computer, or Safari on iPhone/iPad.
5) If you see a waiting screen (Green Room), please wait to be admitted by the studio."""
            }
        
        settings = await db.cleanfeed_settings.find_one({"type": "public"})
        if not settings:
            # Return defaults
            return {
                "cleanfeedGuestUrl": "https://cleanfeed.net/k?iUc5ijKCFYUj",
                "presenterInstructions": """You're invited to join our live broadcast on Cleanfeed.
1) Click this guest link: {{cleanfeedGuestUrl}}
2) When the page opens, click "Start" and allow microphone access.
3) Use headphones (no speakers) to avoid echo.
4) Use Chrome or Edge on computer, or Safari on iPhone/iPad.
5) If you see a waiting screen (Green Room), please wait to be admitted by the studio."""
            }
        
        return {
            "cleanfeedGuestUrl": settings.get("cleanfeedGuestUrl", "https://cleanfeed.net/k?iUc5ijKCFYUj"),
            "presenterInstructions": settings.get("presenterInstructions", """You're invited to join our live broadcast on Cleanfeed.
1) Click this guest link: {{cleanfeedGuestUrl}}
2) When the page opens, click "Start" and allow microphone access.
3) Use headphones (no speakers) to avoid echo.
4) Use Chrome or Edge on computer, or Safari on iPhone/iPad.
5) If you see a waiting screen (Green Room), please wait to be admitted by the studio.""")
        }
    except Exception as e:
        logging.error(f"Error getting Cleanfeed settings: {e}")
        return {
            "cleanfeedGuestUrl": "https://cleanfeed.net/k?iUc5ijKCFYUj",
            "presenterInstructions": """You're invited to join our live broadcast on Cleanfeed.
1) Click this guest link: {{cleanfeedGuestUrl}}
2) When the page opens, click "Start" and allow microphone access.
3) Use headphones (no speakers) to avoid echo.
4) Use Chrome or Edge on computer, or Safari on iPhone/iPad.
5) If you see a waiting screen (Green Room), please wait to be admitted by the studio."""
        }

@api_router.post("/cleanfeed-settings")
async def save_cleanfeed_settings(settings: dict):
    """Save Cleanfeed settings (public only, secrets handled separately)"""
    try:
        if db is None:
            return {"success": False, "error": "Database not available"}
        
        # Only save public settings
        public_settings = {
            "type": "public",
            "cleanfeedGuestUrl": settings.get("cleanfeedGuestUrl", "https://cleanfeed.net/k?iUc5ijKCFYUj"),
            "presenterInstructions": settings.get("presenterInstructions", ""),
            "updated": datetime.utcnow().isoformat()
        }
        
        await db.cleanfeed_settings.replace_one(
            {"type": "public"},
            public_settings,
            upsert=True
        )
        
        return {"success": True}
    except Exception as e:
        logging.error(f"Error saving Cleanfeed settings: {e}")
        return {"success": False, "error": str(e)}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    try:
        if db is None:
            raise Exception("Database not connected")
        
        status_dict = input.dict()
        status_obj = StatusCheck(**status_dict)
        _ = await db.status_checks.insert_one(status_obj.dict())
        return status_obj
    except Exception as e:
        logging.error(f"Error creating status check: {e}")
        raise

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    try:
        if db is None:
            return []
        
        status_checks = await db.status_checks.find().to_list(1000)
        return [StatusCheck(**status_check) for status_check in status_checks]
    except Exception as e:
        logging.error(f"Error getting status checks: {e}")
        return []

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
