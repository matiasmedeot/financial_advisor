# Financial Advisor Backend

FastAPI backend service for the Financial Advisor wizard application.

## Tech Stack
- FastAPI
- UV Package Manager
- Progress Database
- Docker & Docker Compose

## Setup and Run

1. Make sure Docker and Docker Compose are installed
2. From the backend directory, run:
```bash
docker-compose up --build
```

The API will be available at http://localhost:8000

## API Endpoints

- `GET /`: Health check endpoint
- `GET /api/wizard/steps`: Get all wizard steps
- `GET /api/wizard/step/{step_id}`: Get specific wizard step

## Development

To run locally without Docker:

1. Install UV:
```bash
pip install uv
```

2. Install dependencies:
```bash
uv pip install .
```

3. Run the server:
```bash
uvicorn app.main:app --reload
```
