import os
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine, AsyncEngine
from sqlalchemy.orm import declarative_base
from sqlalchemy.pool import StaticPool

# Create declarative base for models
Base = declarative_base()

def create_engine_from_url(database_url: str = None) -> AsyncEngine:
    """Create SQLAlchemy engine from URL."""
    url = database_url or os.getenv(
        "DATABASE_URL",
        "postgresql+asyncpg://postgres:postgres@localhost:5432/financial_advisor"
    )
    
    is_sqlite = url.startswith("sqlite")
    return create_async_engine(
        url,
        echo=os.getenv("SQL_ECHO", "false").lower() == "true",
        future=True,
        # SQLite-specific settings
        connect_args={"check_same_thread": False} if is_sqlite else {},
        poolclass=StaticPool if is_sqlite else None
    )

def create_session_factory(engine: AsyncEngine = None) -> async_sessionmaker[AsyncSession]:
    """Create async session factory."""
    factory = async_sessionmaker(
        class_=AsyncSession,
        expire_on_commit=False,
        autoflush=False
    )
    if engine:
        factory.configure(bind=engine)
    return factory

# Create default engine and session factory
engine = create_engine_from_url()
AsyncSessionLocal = create_session_factory(engine)
