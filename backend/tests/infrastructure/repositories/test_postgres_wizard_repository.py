import pytest
from app.domain.entities.wizard_step import WizardStep, Field, Option
from app.infrastructure.repositories.postgres_wizard_repository import PostgresWizardRepository

@pytest.fixture
async def test_repository(test_session):
    """Create a test repository instance."""
    return PostgresWizardRepository(test_session)

@pytest.mark.asyncio
async def test_create_wizard_step(test_repository):
    """Test creating a wizard step in the repository."""
    step = WizardStep(
        title="Test Step",
        description="Test Description",
        step_type="purpose",
        fields=[
            Field(
                name="test_field",
                type="single_choice",
                label="Test Field",
                required=True,
                options=[
                    Option(
                        id="test_option",
                        text="Test Option",
                        score=1,
                        icon="🔥"
                    )
                ]
            )
        ]
    )
    
    created_step = await test_repository.create(step)
    assert created_step.title == step.title
    assert created_step.description == step.description
    assert created_step.step_type == step.step_type
    assert len(created_step.fields) == 1
    assert created_step.id is not None
    assert created_step.fields[0].name == "test_field"
    assert created_step.fields[0].options[0].id == "test_option"

@pytest.mark.asyncio
async def test_get_all_steps(test_repository):
    """Test getting all wizard steps from the repository."""
    # Create two steps
    steps = [
        WizardStep(
            title=f"Test Step {i}",
            description=f"Test Description {i}",
            step_type="purpose",
            fields=[
                Field(
                    name=f"field_{i}",
                    type="single_choice",
                    label=f"Field {i}",
                    required=True,
                    options=[
                        Option(
                            id=f"option_{i}",
                            text=f"Option {i}",
                            score=i,
                            icon="🔥"
                        )
                    ]
                )
            ]
        ) for i in range(2)
    ]
    
    created_steps = []
    for step in steps:
        created_step = await test_repository.create(step)
        created_steps.append(created_step)
    
    all_steps = await test_repository.get_all()
    assert len(all_steps) >= len(created_steps)
    assert all(isinstance(step, WizardStep) for step in all_steps)
    
    # Verify the created steps are in the returned list
    created_ids = {step.id for step in created_steps}
    returned_ids = {step.id for step in all_steps}
    assert created_ids.issubset(returned_ids)

@pytest.mark.asyncio
async def test_get_step_by_id(test_repository):
    """Test getting a specific wizard step by ID."""
    step = WizardStep(
        title="Test Step",
        description="Test Description",
        step_type="purpose",
        fields=[
            Field(
                name="test_field",
                type="single_choice",
                label="Test Field",
                required=True,
                options=[
                    Option(
                        id="test_option",
                        text="Test Option",
                        score=1,
                        icon="🔥"
                    )
                ]
            )
        ]
    )
    
    created_step = await test_repository.create(step)
    retrieved_step = await test_repository.get_by_id(created_step.id)
    
    assert retrieved_step is not None
    assert retrieved_step.id == created_step.id
    assert retrieved_step.title == step.title
    assert retrieved_step.description == step.description
    assert len(retrieved_step.fields) == 1
    assert retrieved_step.fields[0].name == "test_field"
    assert retrieved_step.fields[0].options[0].id == "test_option"

@pytest.mark.asyncio
async def test_update_wizard_step(test_repository):
    """Test updating a wizard step."""
    # Create initial step
    step = WizardStep(
        title="Initial Title",
        description="Initial Description",
        step_type="purpose",
        fields=[
            Field(
                name="test_field",
                type="single_choice",
                label="Test Field",
                required=True,
                options=[
                    Option(
                        id="test_option",
                        text="Test Option",
                        score=1,
                        icon="🔥"
                    )
                ]
            )
        ]
    )
    
    created_step = await test_repository.create(step)
    
    # Update the step
    updated_data = WizardStep(
        title="Updated Title",
        description="Updated Description",
        step_type="risk_assessment",
        fields=[
            Field(
                name="updated_field",
                type="single_choice",
                label="Updated Field",
                required=True,
                options=[
                    Option(
                        id="updated_option",
                        text="Updated Option",
                        score=2,
                        icon="⚡"
                    )
                ]
            )
        ]
    )
    
    updated_step = await test_repository.update(created_step.id, updated_data)
    
    assert updated_step is not None
    assert updated_step.id == created_step.id
    assert updated_step.title == "Updated Title"
    assert updated_step.description == "Updated Description"
    assert updated_step.step_type == "risk_assessment"
    assert len(updated_step.fields) == 1
    assert updated_step.fields[0].name == "updated_field"
    assert updated_step.fields[0].options[0].id == "updated_option"
    
    # Verify the update persisted
    retrieved_step = await test_repository.get_by_id(created_step.id)
    assert retrieved_step is not None
    assert retrieved_step.title == "Updated Title"
    assert retrieved_step.fields[0].name == "updated_field"

@pytest.mark.asyncio
async def test_update_nonexistent_step(test_repository):
    """Test updating a nonexistent wizard step."""
    step = WizardStep(
        title="Test Step",
        description="Test Description",
        step_type="purpose",
        fields=[]
    )
    
    updated_step = await test_repository.update(999, step)
    assert updated_step is None
    
    # Verify the step really doesn't exist
    retrieved_step = await test_repository.get_by_id(999)
    assert retrieved_step is None
