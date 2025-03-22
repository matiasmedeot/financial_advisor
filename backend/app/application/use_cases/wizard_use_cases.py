from typing import List, Optional
from ...domain.entities.wizard_step import WizardStep
from ...domain.repositories.wizard_repository import WizardStepRepository

class WizardStepUseCases:
    def __init__(self, wizard_repository: WizardStepRepository):
        self._repository = wizard_repository

    async def get_all_steps(self) -> List[WizardStep]:
        return await self._repository.get_all()

    async def get_step_by_id(self, step_id: int) -> Optional[WizardStep]:
        return await self._repository.get_by_id(step_id)

    async def create_step(self, wizard_step: WizardStep) -> WizardStep:
        return await self._repository.create(wizard_step)

    async def update_step(self, step_id: int, wizard_step: WizardStep) -> Optional[WizardStep]:
        return await self._repository.update(step_id, wizard_step)
