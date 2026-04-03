from typing import Optional
import logging
import os
import requests
from cachetools import TTLCache

cache = TTLCache(maxsize=100, ttl=60**60*24)  # Cache with 24 hours TTL


def get_mot_access_token() -> Optional[str]:
    """Get MOT API access token using client credentials flow."""
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
        token = response.json().get('access_token')
        if token:
            cache['mot_api_access_token'] = token
            return token

    except requests.exceptions.RequestException as e:
        logging.error(f"Error getting MOT access token: {str(e)}")
        return None

    return None


def get_ves_data(registration: str) -> dict:
    """Get VES data for a vehicle registration number."""
    registration = registration.strip().upper()
    cache_key = f"ves_{registration}"

    if cache_key in cache:
        logging.debug(f"Returning cached VES data for {registration}")
        return cache[cache_key]
    else:
        logging.debug(f"Making fresh request for {registration}")

    ves_url = os.getenv('VES_URL')
    ves_api_key = os.getenv('VES_API_KEY')

    headers = {
        'x-api-key': ves_api_key,
        'Content-Type': 'application/json',
    }

    data = {
        'registrationNumber': registration,
    }

    try:
        response = requests.post(ves_url, headers=headers, json=data)

        if not response.ok:
            logging.error(f"get_ves_data - response not ok: {response.json()}")
            return {"error": "Failed to retrieve VES data from the API."}

        response_body = response.json()
        logging.debug(f"get_ves_data response: {response_body}")
        cache[cache_key] = response_body
        return response_body

    except requests.exceptions.RequestException as e:
        logging.error(f"Error getting VES data: {str(e)}")
        return {"error": "Failed to connect to VES API."}
