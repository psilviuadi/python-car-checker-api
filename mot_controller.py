from typing import Dict
import logging
import os
import requests
from fastapi import APIRouter
from services import get_mot_access_token

router = APIRouter(prefix="/mot", tags=["MOT"])


@router.get("/{registration}", summary="Get MOT history", description="Retrieve MOT history for a vehicle registration number.")
def get_mot_history(registration: str) -> Dict:
    registration = registration.strip().upper()

    access_token = get_mot_access_token()
    if not access_token:
        return {"error": "Failed to obtain MOT access token."}

    mot_endpoint = os.getenv('MOT_ENDPOINT')
    mot_api_key = os.getenv('MOT_API_KEY')

    headers = {
        'Authorization': f'Bearer {access_token}',
        'X-API-Key': mot_api_key,
    }

    try:
        response = requests.get(
            f"{mot_endpoint}{registration}",
            headers=headers
        )

        response_body = response.json()

        if not response.ok:
            logging.error(f"get_history_for_licence_plate - response is not ok: {response_body}")
            return {"error": "Failed to retrieve MOT data from the API."}

        logging.debug(f"get_history_for_licence_plate response: {response_body}")
        return response_body

    except requests.exceptions.RequestException as e:
        logging.error(f"Error getting MOT history: {str(e)}")
        return {"error": "Failed to connect to MOT API."}
