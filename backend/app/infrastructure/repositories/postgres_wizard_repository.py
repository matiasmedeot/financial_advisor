from typing import List, Optional, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from ...domain.entities.wizard_step import WizardStep, Field, Option
from ...domain.repositories.wizard_repository import WizardStepRepository
from ..models.wizard_step_model import WizardStepModel

class PostgresWizardRepository(WizardStepRepository):
    def __init__(self, session: AsyncSession):
        self._session = session

    async def get_all(self) -> List[WizardStep]:
        """Get all wizard steps."""
        async with self._session.begin():
            result = await self._session.execute(select(WizardStepModel))
            models = result.scalars().all()
            return [self._to_entity(model) for model in models]

    async def get_by_id(self, step_id: int) -> Optional[WizardStep]:
        """Get a wizard step by ID."""
        async with self._session.begin():
            result = await self._session.execute(
                select(WizardStepModel).where(WizardStepModel.id == step_id)
            )
            model = result.scalar_one_or_none()
            return self._to_entity(model) if model else None

    async def create(self, wizard_step: WizardStep) -> WizardStep:
        """Create a new wizard step."""
        async with self._session.begin():
            model = WizardStepModel(
                title=wizard_step.title,
                description=wizard_step.description,
                step_type=wizard_step.step_type,
                fields=self._fields_to_dict(wizard_step.fields)
            )
            self._session.add(model)
            await self._session.flush()
            await self._session.refresh(model)
            return self._to_entity(model)

    async def update(self, step_id: int, wizard_step: WizardStep) -> Optional[WizardStep]:
        """Update an existing wizard step."""
        async with self._session.begin():
            result = await self._session.execute(
                select(WizardStepModel).where(WizardStepModel.id == step_id)
            )
            model = result.scalar_one_or_none()
            if not model:
                return None

            model.title = wizard_step.title
            model.description = wizard_step.description
            model.step_type = wizard_step.step_type
            model.fields = self._fields_to_dict(wizard_step.fields)
            await self._session.flush()
            await self._session.refresh(model)
            return self._to_entity(model)

    def _to_entity(self, model: WizardStepModel) -> WizardStep:
        """Convert a database model to a domain entity."""
        if not model:
            return None
        return WizardStep.from_dict({
            'id': model.id,
            'title': model.title,
            'description': model.description,
            'step_type': model.step_type,
            'fields': model.fields
        })

    def _fields_to_dict(self, fields: List[Field]) -> List[Dict[str, Any]]:
        """Convert domain Field objects to dictionary format for storage."""
        return [{
            'name': field.name,
            'type': field.type,
            'label': field.label,
            'required': field.required,
            'options': [
                {
                    'id': opt.id,
                    'text': opt.text,
                    'score': opt.score,
                    'icon': opt.icon
                } for opt in (field.options or [])
            ]
        } for field in fields]
