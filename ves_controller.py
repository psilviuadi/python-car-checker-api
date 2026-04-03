from typing import Dict
from fastapi import APIRouter
from services import get_ves_data

router = APIRouter(prefix="/ves", tags=["VES"])


@router.get("/{registration}", summary="Get DVLA VES data", description="Retrieve VES data from the DVLA VES API for a vehicle registration number.")
def get_ves(registration: str) -> Dict:
    return get_ves_data(registration)
