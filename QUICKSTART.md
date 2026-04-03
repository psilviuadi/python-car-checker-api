# Quick Start Guide

## TL;DR - Get Running in 5 Minutes

### Prerequisites
- Python 3.8+
- Node.js 16+
- Valid DVLA API keys (MOT and VES)

### Quick Setup

**Terminal 1 - Backend:**
```bash
python -m venv .venv
.venv\Scripts\Activate.ps1  # Windows
# OR
source .venv/bin/activate  # Linux/Mac

pip install -r requirements.txt

# Update .env with your DVLA API keys
copy .env.example .env
# Edit .env with your credentials

uvicorn main:app --reload
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

**Open in Browser:**
```
http://localhost:3000
```

## Full Instructions

### 1. Backend Setup

```bash
# Create virtual environment
python -m venv .venv

# Activate it
Windows: .venv\Scripts\Activate.ps1
Linux/Mac: source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Then edit .env with your DVLA API credentials

# Run server
uvicorn main:app --reload
```

Backend will be at: `http://localhost:8000`
API docs at: `http://localhost:8000/docs`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be at: `http://localhost:3000`

### 3. Testing

Go to `http://localhost:3000` and:
1. Enter a UK registration (e.g., `GP56FBF`)
2. Click Search
3. View MOT history and VES data

## Environment Variables

### Backend (.env)
```
MOT_TOKEN_URL=<from DVLA>
MOT_CLIENT_ID=<from DVLA>
MOT_CLIENT_SECRET=<from DVLA>
MOT_SCOPE=https://tapi.dvsa.gov.uk/.default
MOT_API_KEY=<from DVLA>
MOT_ENDPOINT=https://history.mot.api.gov.uk/v1/trade/vehicles/registration/

VES_URL=https://ves.org.uk:443/api/vehicledetails/v2
VES_API_KEY=<from DVLA>
```

### Frontend (.env - optional)
```
VITE_API_URL=http://localhost:8000
```

## Troubleshooting

### Port Already in Use?
```bash
# Backend on different port
uvicorn main:app --port 8001 --reload

# Frontend on different port
cd frontend
npm run dev -- --port 3001
```

### CORS Errors?
Ensure backend is running - it has CORS configured for localhost:3000 and :3001

### API Connection Issues?
- Check .env has valid DVLA API keys
- Verify backend is running: `curl http://localhost:8000/docs`
- Check browser console for detailed errors

## API Endpoints

- `GET /mot/{registration}` - MOT history
- `GET /ves/{registration}` - Vehicle details (VES)
- Both return JSON with vehicle data

## What's Working

✅ License plate input validation
✅ Concurrent API calls (MOT + VES)
✅ Complete MOT history display with defects
✅ VES vehicle data display
✅ Error handling and messages
✅ Responsive design
✅ Loading states
✅ Data caching on backend (24-hour TTL)

## Next Steps

1. Get DVLA API credentials from https://www.gov.uk/government/organisations/driver-and-vehicle-standards-agency
2. Add them to `.env`
3. Run both services
4. Start checking vehicles!

## File Structure

```
python-car-checker/
├── backend files/
│   ├── main.py (FastAPI app with CORS)
│   ├── mot_controller.py (MOT endpoint)
│   ├── ves_controller.py (VES endpoint)
│   ├── services.py (API calls & caching)
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/ (React components)
    │   ├── services/ (API client)
    │   └── App.tsx (root)
    ├── package.json
    ├── vite.config.ts
    ├── index.html
    └── README.md
```

## Support

See README.md for detailed documentation on both backend and frontend.
