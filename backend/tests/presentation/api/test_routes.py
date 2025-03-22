import pytest
from app.presentation.api.schemas import WizardStepCreate, StepType
from app.main import app

test_step_data = {
    "title": "Test Investment Purpose",
    "description": "Test your investment purpose",
    "step_type": StepType.PURPOSE,
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
                    "icon": ""
                }
            ]
        }
    ]
}

@pytest.mark.asyncio
async def test_create_wizard_step(test_client):
    """Test creating a wizard step."""
    response = test_client.post("/api/wizard/steps", json={
        **test_step_data,
        "step_type": test_step_data["step_type"].value
    })
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == test_step_data["title"]
    assert data["description"] == test_step_data["description"]
    assert data["step_type"] == test_step_data["step_type"].value
    assert len(data["fields"]) == 1
    assert "id" in data

@pytest.mark.asyncio
async def test_get_wizard_steps(test_client):
    """Test getting all wizard steps."""
    # First create a step
    test_client.post("/api/wizard/steps", json={
        **test_step_data,
        "step_type": test_step_data["step_type"].value
    })
    
    # Then get all steps
    response = test_client.get("/api/wizard/steps")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 1
    assert data[0]["title"] == test_step_data["title"]

@pytest.mark.asyncio
async def test_get_wizard_step_by_id(test_client):
    """Test getting a specific wizard step."""
    # First create a step
    create_response = test_client.post("/api/wizard/steps", json={
        **test_step_data,
        "step_type": test_step_data["step_type"].value
    })
    step_id = create_response.json()["id"]
    
    # Then get the specific step
    response = test_client.get(f"/api/wizard/step/{step_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == step_id
    assert data["title"] == test_step_data["title"]

@pytest.mark.asyncio
async def test_get_nonexistent_step(test_client):
    """Test getting a nonexistent wizard step."""
    response = test_client.get("/api/wizard/step/999")
    assert response.status_code == 404

@pytest.mark.asyncio
async def test_create_invalid_wizard_step(test_client):
    """Test creating a wizard step with invalid data."""
    invalid_data = {
        "title": "Invalid Step",
        # Missing required fields
    }
    response = test_client.post("/api/wizard/steps", json=invalid_data)
    assert response.status_code == 422  # Validation error

@pytest.mark.asyncio
async def test_create_step_with_invalid_step_type(test_client):
    """Test creating a wizard step with invalid step type."""
    invalid_step_data = {
        **test_step_data,
        "step_type": "invalid_type"
    }
    response = test_client.post("/api/wizard/steps", json=invalid_step_data)
    assert response.status_code == 422  # Validation error
