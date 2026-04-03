# Python Car Checker

A full-stack application for checking vehicle MOT and VES details using DVLA APIs. Includes a FastAPI backend and a modern React frontend.

You can apply for the API keys on the DVLA website:
- [MOT History API](https://www.gov.uk/government/organisations/driver-and-vehicle-standards-agency/contact/mot-history-api)
- [VES API](https://www.gov.uk/government/organisations/driver-and-vehicle-standards-agency/contact/vehicle-enquiry-service-api)

## Setup

### Prerequisites
- Python 3.8 or higher
- Node.js 16 or higher & npm
- pip (Python package installer)

## Backend Setup

### Python Environment Setup

1. Install Python from [python.org](https://python.org)

2. Navigate to the project root and create a virtual environment:
```bash
python -m venv .venv
```

3. Activate the virtual environment:

Windows:
```bash
.venv\Scripts\Activate.ps1
```

If you get an execution policy error, run this once:
```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Linux/Mac:
```bash
source .venv/bin/activate
```

4. Install requirements:
```bash
pip install -r requirements.txt
```

### Environment Configuration

1. Copy the `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Fill in the following environment variables in `.env`:
```
MOT_TOKEN_URL=<your-mot-token-endpoint>
MOT_CLIENT_ID=<your-mot-client-id>
MOT_CLIENT_SECRET=<your-mot-client-secret>
MOT_SCOPE=<your-mot-scope>
MOT_ENDPOINT=<your-mot-api-endpoint>
MOT_API_KEY=<your-mot-api-key>
VES_URL=<your-ves-api-endpoint>
VES_API_KEY=<your-ves-api-key>
```

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (if needed):
```bash
# Frontend currently uses http://localhost:8000 for the backend
# No additional env vars needed, but you can add them if required
```

## Running Locally

### Option 1: Run Backend and Frontend Separately

#### Terminal 1 - Backend:
```bash
# Make sure you're in the project root directory
# Activate the virtual environment first

Windows:
.venv\Scripts\Activate.ps1

Linux/Mac:
source .venv/bin/activate

# Then start the FastAPI server
uvicorn main:app --reload
```

The API will be available at:
- Main endpoint: http://localhost:8000
- API documentation: http://localhost:8000/docs
- Interactive API docs: http://localhost:8000/redoc

#### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

The frontend will be available at:
- Application: http://localhost:3000

### Option 2: Running Both Services (Docker)

You can also containerize both services if needed. Create appropriate Dockerfiles for production deployment.

## How to Use

1. Start both the backend (port 8000) and frontend (port 3000)
2. Open the application in your browser at http://localhost:3000
3. Enter a UK registration number (e.g., GP56FBF)
4. Click "Search" to retrieve MOT history and VES data
5. View comprehensive vehicle information including:
   - Basic vehicle details (make, model, color, fuel type)
   - Current MOT status and expiry date
   - Current tax status and due date
   - Complete MOT history with test results and defects
   - DVLA VES data (engine capacity, emissions, wheelplan)

## API Endpoints

### MOT Endpoints
- `GET /mot/{registration}` - Get MOT history for a vehicle

### VES Endpoints
- `GET /ves/{registration}` - Get DVLA VES data for a vehicle

For full API documentation, run the backend and visit http://localhost:8000/docs

## Features

- ✅ Real-time vehicle data lookup
- ✅ Complete MOT history with defects
- ✅ DVLA VES vehicle data
- ✅ Beautiful responsive UI
- ✅ Error handling and validation
- ✅ Data caching for performance

## Development

The application uses:
- **Backend**: FastAPI with Python
- **Frontend**: React with TypeScript
- **Styling**: CSS with responsive design

### Backend Features
- Automatic API documentation (Swagger UI)
- CORS enabled for frontend communication
- Caching with 24-hour TTL
- Error handling and logging

### Frontend Features
- Component-based architecture
- Type-safe with TypeScript
- Responsive design for mobile and desktop
- Real-time error messages
- Loading states

## Troubleshooting

### Port Already in Use
- Backend default: 8000
- Frontend default: 3000

If ports are busy, you can specify different ports:
```bash
# Backend
uvicorn main:app --port 8001 --reload

# Frontend
npm run dev -- --port 3001
```

Then update the API endpoint in `frontend/src/services/api.ts` to match the backend port.

### CORS Errors
Make sure the backend is running with CORS enabled (already configured in main.py). The frontend automatically connects to `http://localhost:8000`.

### API Key Issues
Ensure all environment variables in `.env` are correctly set with valid DVLA API credentials.

## License

MIT
