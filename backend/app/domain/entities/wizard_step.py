from dataclasses import dataclass
from typing import List, Dict, Any, Optional

@dataclass
class Option:
    id: str
    text: str
    score: Optional[int] = None
    icon: Optional[str] = None

@dataclass
class Field:
    name: str
    type: str
    label: str
    options: List[Option] = None
    required: bool = False

@dataclass
class WizardStep:
    title: str
    description: Optional[str]
    fields: List[Field]
    step_type: str  # 'purpose', 'risk_assessment', 'investment_options'
    id: Optional[int] = None

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'WizardStep':
        fields = [Field(**{**field, 'options': [Option(**opt) for opt in field.get('options', [])]}) 
                 for field in data.get('fields', [])]
        return cls(
            id=data.get('id'),
            title=data.get('title'),
            description=data.get('description'),
            step_type=data.get('step_type'),
            fields=fields
        )
