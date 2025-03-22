from sqlalchemy import Column, Integer, String, JSON
from ..database import Base

class WizardStepModel(Base):
    __tablename__ = "wizard_steps"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    step_type = Column(String, nullable=False)
    fields = Column(JSON, nullable=False)
