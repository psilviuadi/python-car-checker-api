from typing import Union
from typing import Optional
import requests
from cachetools import TTLCache
import logging
from datetime import timedelta
from fastapi import FastAPI
from dotenv import load_dotenv
import os

load_dotenv()
cache = TTLCache(maxsize=100, ttl=60**60*24)  # Cache with 24 hours TTL

app = FastAPI()

def getMotAccessToken() -> Optional[str]:
    """Get MOT API access token using client credentials flow."""
    # Try to get from cache first
    if 'mot_api_access_token' in cache:
        return cache['mot_api_access_token']
    
    token_url = os.getenv("MOT_TOKEN_URL")
    client_id = os.getenv("MOT_CLIENT_ID")
    client_secret = os.getenv("MOT_CLIENT_SECRET")
    scope = os.getenv("MOT_SCOPE")

    data = {
        'grant_type': 'client_credentials',
        'client_id': client_id,
        'client_secret': client_secret,
        'scope': scope,
    }

    try:
        response = requests.post(
            token_url,
            data=data,
            headers={'Content-Type': 'application/x-www-form-urlencoded'}
        )

        if not response.ok:
            logging.error(f"getMotAccessToken - response is not ok: {response.json()}")
            return None

        logging.debug(f"getMotAccessToken response: {response.json()}")
        # Get token and store in cache
        token = response.json().get('access_token')
        if token:
            cache['mot_api_access_token'] = token
            return token

    except Exception as e:
        logging.error(f"Error getting MOT access token: {str(e)}")
        return None
    
    return None

@app.get("/mot/{registration}")
def get_mot_history(registration: str) -> dict:
    """Get MOT history for a vehicle registration number."""
    registration = registration.strip().upper()
    
    # Get access token using existing function
    access_token = getMotAccessToken()
    if not access_token:
        return {"error": "Failed to obtain MOT access token."}
    
    mot_endpoint = os.getenv('MOT_ENDPOINT')
    mot_api_key = os.getenv('MOT_API_KEY')
    
    headers = {
        'Authorization': f'Bearer {access_token}',
        'X-API-Key': mot_api_key
    }
    
    try:
        response = requests.get(
            f"{mot_endpoint}{registration}",
            headers=headers
        )
        
        response_body = response.json()
        
        if not response.ok:
            logging.error(f"get_history_for_licence_plate - response is not ok: {response_body}")
            return {
                "error": "Failed to retrieve MOT data from the API.",
            }
            
        logging.debug(f"get_history_for_licence_plate response: {response_body}")
        return response_body
        
    except requests.exceptions.RequestException as e:
        logging.error(f"Error getting MOT history: {str(e)}")
        return {"error": "Failed to connect to MOT API."}
