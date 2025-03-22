from fastapi import APIRouter, Depends, HTTPException
from typing import List, Dict, Any
from .schemas import WizardStepResponse, WizardStepCreate, WizardStepUpdate, FieldSchema, OptionSchema
from .dependencies import get_wizard_use_cases
from ...application.use_cases.wizard_use_cases import WizardStepUseCases
from ...domain.entities.wizard_step import WizardStep, Field, Option
import logging

router = APIRouter(prefix="/api/wizard", tags=["wizard"])
logger1 = logging.getLogger("myapp.area1")

def _convert_to_wizard_step(step_data: WizardStepCreate | WizardStepUpdate) -> WizardStep:
    """Convert DTO to domain entity."""
    fields = []
    for field_data in step_data.fields:
        options = []
        if field_data.options:
            for option_data in field_data.options:
                options.append(Option(
                    id=option_data.id,
                    text=option_data.text,
                    score=option_data.score,
                    icon=option_data.icon
                ))
        
        fields.append(Field(
            name=field_data.name,
            type=field_data.type,
            label=field_data.label,
            required=field_data.required,
            options=options
        ))
    
    return WizardStep(
        title=step_data.title,
        description=step_data.description,
        step_type=step_data.step_type.value,
        fields=fields
    )

def _convert_to_response(wizard_step: WizardStep) -> Dict[str, Any]:
    """Convert domain entity to DTO."""
    return {
        "id": wizard_step.id,
        "title": wizard_step.title,
        "description": wizard_step.description,
        "step_type": wizard_step.step_type,
        "fields": [
            {
                "name": field.name,
                "type": field.type,
                "label": field.label,
                "required": field.required,
                "options": [
                    {
                        "id": opt.id,
                        "text": opt.text,
                        "score": opt.score,
                        "icon": opt.icon
                    } for opt in (field.options or [])
                ]
            } for field in wizard_step.fields
        ]
    }

@router.get("/steps", response_model=List[WizardStepResponse])
async def get_wizard_steps(
    use_cases: WizardStepUseCases = Depends(get_wizard_use_cases)
) -> List[WizardStepResponse]:
    """Get all wizard steps."""
    logger1.info("GET /steps TEST")
    steps = await use_cases.get_all_steps()
    return [WizardStepResponse.model_validate(_convert_to_response(step)) for step in steps]

@router.get("/step/{step_id}", response_model=WizardStepResponse)
async def get_wizard_step(
    step_id: int,
    use_cases: WizardStepUseCases = Depends(get_wizard_use_cases)
) -> WizardStepResponse:
    """Get a specific wizard step."""
    logger1.error("GET a specific wizard step TEST")
    step = await use_cases.get_step_by_id(step_id)
    if not step:
        raise HTTPException(status_code=404, detail="Step not found")
    return WizardStepResponse.model_validate(_convert_to_response(step))

@router.post("/steps", response_model=WizardStepResponse)
async def create_wizard_step(
    step_data: WizardStepCreate,
    use_cases: WizardStepUseCases = Depends(get_wizard_use_cases)
) -> WizardStepResponse:
    """Create a new wizard step."""
    wizard_step = _convert_to_wizard_step(step_data)
    created_step = await use_cases.create_step(wizard_step)
    return WizardStepResponse.model_validate(_convert_to_response(created_step))

@router.put("/step/{step_id}", response_model=WizardStepResponse)
async def update_wizard_step(
    step_id: int,
    step_data: WizardStepUpdate,
    use_cases: WizardStepUseCases = Depends(get_wizard_use_cases)
) -> WizardStepResponse:
    """Update an existing wizard step."""
    wizard_step = _convert_to_wizard_step(step_data)
    updated_step = await use_cases.update_step(step_id, wizard_step)
    if not updated_step:
        raise HTTPException(status_code=404, detail="Step not found")
    return WizardStepResponse.model_validate(_convert_to_response(updated_step))
