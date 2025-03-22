import requests
import json
from typing import Dict, Any

def create_wizard_step(step_data: Dict[str, Any]) -> None:
    """Create a wizard step via the API."""
    try:
        response = requests.post(
            "http://localhost:8000/api/wizard/steps",
            json=step_data,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status: {response.status_code}")
        if response.status_code == 200:
            print(f"Successfully created step: {step_data['title']}")
            print(f"Response: {response.json()}")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Error creating step: {e}")

# Paso 1: Objetivo de Inversión
purpose_step = {
    "title": "Objetivo de Inversión",
    "description": "¿Cuál es tu principal objetivo financiero?",
    "step_type": "purpose",
    "fields": [
        {
            "name": "investment_purpose",
            "type": "single_choice",
            "label": "Selecciona tu objetivo principal",
            "required": True,
            "options": [
                {
                    "id": "retirement",
                    "text": "Ahorrar para mi jubilación",
                    "icon": "🏖️"
                },
                {
                    "id": "house",
                    "text": "Comprar una propiedad",
                    "icon": "🏠"
                },
                {
                    "id": "education",
                    "text": "Invertir en educación",
                    "icon": "🎓"
                },
                {
                    "id": "wealth",
                    "text": "Hacer crecer mi patrimonio",
                    "icon": "📈"
                }
            ]
        }
    ]
}

# Paso 2: Evaluación de Riesgo
risk_assessment_step = {
    "title": "Perfil de Riesgo",
    "description": "Evaluemos tu tolerancia al riesgo en inversiones",
    "step_type": "risk_assessment",
    "fields": [
        {
            "name": "investment_experience",
            "type": "single_choice",
            "label": "¿Cuál es tu experiencia en inversiones?",
            "required": True,
            "options": [
                {
                    "id": "none",
                    "text": "No tengo experiencia",
                    "score": 1,
                    "icon": "🆕"
                },
                {
                    "id": "basic",
                    "text": "Tengo conocimientos básicos",
                    "score": 2,
                    "icon": "📚"
                },
                {
                    "id": "intermediate",
                    "text": "He invertido anteriormente",
                    "score": 3,
                    "icon": "📊"
                },
                {
                    "id": "expert",
                    "text": "Soy un inversor experimentado",
                    "score": 4,
                    "icon": "🎯"
                }
            ]
        },
        {
            "name": "risk_tolerance",
            "type": "single_choice",
            "label": "¿Cómo reaccionarías si tus inversiones pierden 20% de su valor?",
            "required": True,
            "options": [
                {
                    "id": "panic",
                    "text": "Vendería todo inmediatamente",
                    "score": 1,
                    "icon": "😰"
                },
                {
                    "id": "concerned",
                    "text": "Me preocuparía pero esperaría",
                    "score": 2,
                    "icon": "😟"
                },
                {
                    "id": "calm",
                    "text": "Mantendría la calma y esperaría",
                    "score": 3,
                    "icon": "😌"
                },
                {
                    "id": "opportunity",
                    "text": "Lo vería como una oportunidad de compra",
                    "score": 4,
                    "icon": "🎯"
                }
            ]
        }
    ]
}

# Paso 3: Opciones de Inversión
investment_options_step = {
    "title": "Opciones de Inversión",
    "description": "Basado en tu perfil, estas son las opciones recomendadas",
    "step_type": "investment_options",
    "fields": [
        {
            "name": "investment_choice",
            "type": "single_choice",
            "label": "Selecciona el tipo de inversión que prefieres",
            "required": True,
            "options": [
                {
                    "id": "conservative",
                    "text": "Cartera Conservadora - Bonos y renta fija",
                    "icon": "🛡️",
                    "score": 1
                },
                {
                    "id": "moderate",
                    "text": "Cartera Moderada - Mix de bonos y acciones",
                    "icon": "⚖️",
                    "score": 2
                },
                {
                    "id": "growth",
                    "text": "Cartera de Crecimiento - Enfoque en acciones",
                    "icon": "📈",
                    "score": 3
                },
                {
                    "id": "aggressive",
                    "text": "Cartera Agresiva - Acciones de alto crecimiento",
                    "icon": "🚀",
                    "score": 4
                }
            ]
        }
    ]
}

if __name__ == "__main__":
    print("Iniciando la población del wizard de inversión...")
    
    # Crear los pasos en orden
    steps = [purpose_step, risk_assessment_step, investment_options_step]
    
    for step in steps:
        print(f"\nCreando paso: {step['title']}")
        create_wizard_step(step)
    
    print("\nProceso completado.")
