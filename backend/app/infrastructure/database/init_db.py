from sqlalchemy.ext.asyncio import AsyncEngine
from .base import Base, engine

async def init_db(db_engine: AsyncEngine = None):
    """Initialize the database by creating all tables.
    
    Args:
        db_engine: Optional custom engine to use. If not provided, uses default engine.
    """
    target_engine = db_engine or engine
    async with target_engine.begin() as conn:
        # Drop all tables if they exist
        await conn.run_sync(Base.metadata.drop_all)
        # Create all tables
        await conn.run_sync(Base.metadata.create_all)
