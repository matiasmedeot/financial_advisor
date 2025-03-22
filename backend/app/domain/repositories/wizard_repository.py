from abc import ABC, abstractmethod
from typing import List, Optional
from ..entities.wizard_step import WizardStep

class WizardStepRepository(ABC):
    @abstractmethod
    async def get_all(self) -> List[WizardStep]:
        pass

    @abstractmethod
    async def get_by_id(self, step_id: int) -> Optional[WizardStep]:
        pass

    @abstractmethod
    async def create(self, wizard_step: WizardStep) -> WizardStep:
        pass

    @abstractmethod
    async def update(self, step_id: int, wizard_step: WizardStep) -> Optional[WizardStep]:
        pass
