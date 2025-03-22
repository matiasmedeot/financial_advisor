from typing import AsyncGenerator
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.infrastructure.database.base import AsyncSessionLocal
from app.application.use_cases.wizard_use_cases import WizardStepUseCases
from app.infrastructure.repositories.postgres_wizard_repository import PostgresWizardRepository

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Get database session."""
    session = AsyncSessionLocal()
    try:
        yield session
    finally:
        await session.close()

async def get_wizard_use_cases(session: AsyncSession = Depends(get_db)) -> WizardStepUseCases:
    """Get wizard step use cases with repository."""
    repository = PostgresWizardRepository(session)
    return WizardStepUseCases(repository)
