import pytest
import asyncio
import os
from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.testclient import TestClient
from app.infrastructure.database import Base
from app.infrastructure.database.base import create_engine_from_url, create_session_factory
from app.main import app
from app.presentation.api.dependencies import get_db, get_wizard_use_cases
from app.application.use_cases.wizard_use_cases import WizardStepUseCases
from app.infrastructure.repositories.postgres_wizard_repository import PostgresWizardRepository

# Set test environment
os.environ["DATABASE_URL"] = "sqlite+aiosqlite:///:memory:"
os.environ["SQL_ECHO"] = "false"

@pytest.fixture(scope="session")
def event_loop():
    """Create an instance of the default event loop for each test case."""
    try:
        loop = asyncio.get_running_loop()
    except RuntimeError:
        loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    yield loop
    loop.close()

@pytest.fixture(scope="function")
async def test_engine():
    """Create a test database engine."""
    # Create test engine using SQLite
    engine = create_engine_from_url()
    
    # Initialize the test database
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    
    yield engine
    
    # Clean up
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
    
    await engine.dispose()

@pytest.fixture
async def test_session(test_engine) -> AsyncGenerator[AsyncSession, None]:
    """Create a test database session."""
    # Create session factory bound to test engine
    session_factory = create_session_factory(test_engine)
    
    # Create and yield session
    async with session_factory() as session:
        yield session
        # Rollback any pending changes
        await session.rollback()

@pytest.fixture
async def test_client(test_session) -> AsyncGenerator[TestClient, None]:
    """Create a test client with the test database."""
    # Override database session
    async def override_get_db():
        yield test_session

    # Override use cases with test repository
    async def override_get_wizard_use_cases():
        return WizardStepUseCases(PostgresWizardRepository(test_session))
    
    # Apply overrides
    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_wizard_use_cases] = override_get_wizard_use_cases
    
    # Create test client
    client = TestClient(app)
    yield client
    
    # Clear overrides and rollback any pending changes
    app.dependency_overrides.clear()
    await test_session.rollback()
