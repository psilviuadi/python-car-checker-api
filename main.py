import logging
import os

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from mot_controller import router as mot_router
from ves_controller import router as ves_router

logging.basicConfig(level=logging.DEBUG, format="%(asctime)s %(levelname)s %(name)s %(message)s")

load_dotenv()

openapi_tags = [
    {"name": "MOT", "description": "MOT endpoints for vehicle history."},
    {"name": "VES", "description": "DVLA VES API endpoints for vehicle data."},
]

app = FastAPI(
    title="Vehicle Data API",
    description="Retrieve MOT history and DVLA VES vehicle data.",
    openapi_tags=openapi_tags,
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(mot_router)
app.include_router(ves_router)
