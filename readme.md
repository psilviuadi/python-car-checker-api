# Python Car Checker

A FastAPI application for checking vehicle MOT and VES details.
You can apply for the API keys on DVLA website

## Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Python Environment Setup

1. Install Python from [python.org](https://python.org)

2. Create a virtual environment:
```bash
python -m venv .venv
```

3. Activate the virtual environment:

Windows:
```bash
.venv\Scripts\Activate.ps1
```

If you get an execution policy error, run this once
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


## Daily Usage

1. Activate the virtual environment (if not already activated):

Windows:
```bash
.venv\Scripts\Activate.ps1
```

If you get an execution policy error, run this once
```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Linux/Mac:
```bash
source .venv/bin/activate
```

2. Start the FastAPI server:
```bash
uvicorn main:app --reload
```

The API will be available at:
- Main endpoint: http://localhost:8000
- API documentation: http://localhost:8000/docs

## API Endpoints
Read from the documentation

## Development

The application uses FastAPI with automatic API documentation. Access the interactive API docs at `/docs` endpoint when the server is running.