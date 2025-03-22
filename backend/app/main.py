from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .presentation.api.routes import router
from .infrastructure.database.base import Base, engine
import logging
import os
import sys



@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handle startup and shutdown events."""
    # Only initialize database in production mode
    if not str(engine.url).startswith('sqlite'):
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(
    title="Financial Advisor API",
    lifespan=lifespan
)

# Configurar OpenTelemetry
# setup_otel(app)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
if os.getenv('TEST_ENV') != '1' and 'pytest' not in sys.modules:
    from .observalibity.otel_config import setup_otel
    setup_otel(app)

# Include API routes
app.include_router(router)


@app.get("/")
async def root():
    return {"message": "Financial Advisor API"}
