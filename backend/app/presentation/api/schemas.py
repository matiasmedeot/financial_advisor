from pydantic import BaseModel
from typing import List, Optional
from enum import Enum

class StepType(str, Enum):
    PURPOSE = "purpose"
    RISK_ASSESSMENT = "risk_assessment"
    INVESTMENT_OPTIONS = "investment_options"

class OptionSchema(BaseModel):
    id: str
    text: str
    score: Optional[int] = None
    icon: Optional[str] = None

class FieldSchema(BaseModel):
    name: str
    type: str
    label: str
    required: bool = False
    options: Optional[List[OptionSchema]] = None

class WizardStepBase(BaseModel):
    title: str
    description: Optional[str]
    fields: List[FieldSchema]
    step_type: StepType

class WizardStepCreate(WizardStepBase):
    pass

class WizardStepUpdate(WizardStepBase):
    pass

class WizardStepResponse(WizardStepBase):
    id: int

    class Config:
        from_attributes = True
