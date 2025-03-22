import pytest
from app.domain.entities.wizard_step import WizardStep, Field, Option

def test_option_creation():
    """Test Option entity creation."""
    option = Option(
        id="test_id",
        text="Test Option",
        score=5,
        icon="🔥"
    )
    assert option.id == "test_id"
    assert option.text == "Test Option"
    assert option.score == 5
    assert option.icon == "🔥"

def test_field_creation():
    """Test Field entity creation."""
    options = [
        Option(id="opt1", text="Option 1"),
        Option(id="opt2", text="Option 2")
    ]
    field = Field(
        name="test_field",
        type="single_choice",
        label="Test Field",
        required=True,
        options=options
    )
    assert field.name == "test_field"
    assert field.type == "single_choice"
    assert field.label == "Test Field"
    assert field.required is True
    assert len(field.options) == 2

def test_wizard_step_creation():
    """Test WizardStep entity creation."""
    field = Field(
        name="purpose",
        type="single_choice",
        label="Select Purpose",
        required=True,
        options=[Option(id="opt1", text="Option 1")]
    )
    wizard_step = WizardStep(
        title="Test Step",
        description="Test Description",
        step_type="purpose",
        fields=[field]
    )
    assert wizard_step.title == "Test Step"
    assert wizard_step.description == "Test Description"
    assert wizard_step.step_type == "purpose"
    assert len(wizard_step.fields) == 1

def test_wizard_step_from_dict():
    """Test WizardStep creation from dictionary."""
    step_data = {
        "title": "Investment Purpose",
        "description": "Select your investment purpose",
        "step_type": "purpose",
        "fields": [
            {
                "name": "purpose",
                "type": "single_choice",
                "label": "Select Purpose",
                "required": True,
                "options": [
                    {
                        "id": "retirement",
                        "text": "Retirement",
                        "score": 1,
                        "icon": "🏖️"
                    }
                ]
            }
        ]
    }
    wizard_step = WizardStep.from_dict(step_data)
    assert wizard_step.title == step_data["title"]
    assert wizard_step.description == step_data["description"]
    assert wizard_step.step_type == step_data["step_type"]
    assert len(wizard_step.fields) == 1
    assert wizard_step.fields[0].options[0].icon == "🏖️"
