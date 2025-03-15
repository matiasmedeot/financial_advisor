import React, { useState } from 'react';
import styled from 'styled-components';

const WizardContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: white;
`;

const StepTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-size: 2rem;
`;

const StepDescription = styled.p`
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 2rem;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 1.2rem;
  margin: 0.8rem 0;
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  background-color: ${props => props.selected ? 'var(--primary-color)' : 'white'};
  color: ${props => props.selected ? 'white' : 'var(--primary-color)'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  
  &:hover {
    background-color: ${props => props.selected ? 'var(--primary-color)' : 'var(--light-bg)'};
    transform: translateY(-2px);
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
`;

const NavButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 30px;
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background-color: var(--secondary-color);
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: var(--disabled-color);
    cursor: not-allowed;
  }
`;

const ResultCard = styled.div`
  background-color: var(--light-bg);
  border-radius: 12px;
  padding: 2rem;
  margin: 1rem 0;
  border-left: 4px solid var(--primary-color);
`;

const ResultTitle = styled.h3`
  color: var(--primary-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const InvestmentOption = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const OptionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: ${props => props.isExpanded ? '1rem' : '0'};
`;

const OptionIcon = styled.span`
  font-size: 2rem;
`;

const OptionTitle = styled.h4`
  color: var(--secondary-color);
  font-size: 1.2rem;
  margin: 0;
`;

const OptionDescription = styled.p`
  margin: 0.5rem 0;
  color: var(--text-color);
`;

const ExpandedDetails = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
`;

const DetailItem = styled.div`
  margin: 0.5rem 0;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;

  &:before {
    content: "•";
    color: var(--primary-color);
  }
`;

const investmentOptions = {
  lowRisk: [
    {
      type: 'Plazo Fijo',
      icon: '🏦',
      description: 'Inversión de bajo riesgo con rendimiento fijo. Ideal para preservar capital con retornos predecibles.',
      details: [
        'Tasa de interés fija garantizada',
        'Plazos desde 30 días hasta 365 días',
        'Capital garantizado por el banco',
        'Ideal para fondos de emergencia',
        'Renovación automática disponible'
      ]
    },
    {
      type: 'Bonos Gubernamentales',
      icon: '📜',
      description: 'Títulos de deuda pública con respaldo del Estado. Ofrecen seguridad y rendimientos estables.',
      details: [
        'Respaldados por el gobierno nacional',
        'Pagos de interés periódicos',
        'Diferentes plazos disponibles',
        'Alta liquidez en el mercado secundario',
        'Protección contra default'
      ]
    }
  ],
  mediumRisk: [
    {
      type: 'Bienes Raíces',
      icon: '🏢',
      description: 'Inversión en propiedades para renta o plusvalía. Balance entre estabilidad y potencial de crecimiento.',
      details: [
        'Ingresos pasivos por alquiler',
        'Apreciación del valor a largo plazo',
        'Protección contra la inflación',
        'Posibilidad de apalancamiento',
        'Diversificación de portafolio'
      ]
    },
    {
      type: 'Bonos Corporativos',
      icon: '🏭',
      description: 'Títulos de deuda empresarial con mejores rendimientos que los bonos gubernamentales.',
      details: [
        'Mayor rendimiento que bonos gubernamentales',
        'Diferentes calificaciones crediticias',
        'Pagos de interés regulares',
        'Diversificación por sectores',
        'Vencimientos flexibles'
      ]
    }
  ],
  highRisk: [
    {
      type: 'Acciones',
      icon: '📈',
      description: 'Participación en empresas cotizadas en bolsa. Mayor potencial de rendimiento con alta volatilidad.',
      details: [
        'Potencial de alto rendimiento',
        'Derecho a dividendos',
        'Participación en el crecimiento empresarial',
        'Alta liquidez en mercados desarrollados',
        'Diversificación por sectores y regiones'
      ]
    },
    {
      type: 'Criptomonedas',
      icon: '₿',
      description: 'Activos digitales con alto potencial de rendimiento pero también alta volatilidad y riesgo.',
      details: [
        'Mercado 24/7',
        'Alta volatilidad y potencial de rendimiento',
        'Tecnología blockchain',
        'Independencia de sistemas financieros tradicionales',
        'Diversas aplicaciones y casos de uso'
      ]
    }
  ]
};

const InvestmentWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [investmentPurpose, setInvestmentPurpose] = useState('');
  const [riskTolerance, setRiskTolerance] = useState('');
  const [investorProfile, setInvestorProfile] = useState('');
  const [expandedOption, setExpandedOption] = useState(null);

  const determineInvestorProfile = () => {
    if (!investmentPurpose || !riskTolerance) return;

    if (investmentPurpose === 'jubilacion' || investmentPurpose === 'proteger') {
      setInvestorProfile(riskTolerance === 'alto' ? 'medio' : 'bajo');
    } else if (investmentPurpose === 'compra') {
      setInvestorProfile(riskTolerance === 'bajo' ? 'medio' : 'alto');
    } else {
      setInvestorProfile(riskTolerance === 'alto' ? 'alto' : 'medio');
    }
  };

  const getRecommendations = () => {
    switch (investorProfile) {
      case 'bajo':
        return investmentOptions.lowRisk;
      case 'medio':
        return [...investmentOptions.lowRisk, ...investmentOptions.mediumRisk];
      case 'alto':
        return [...investmentOptions.mediumRisk, ...investmentOptions.highRisk];
      default:
        return [];
    }
  };

  const handleOptionClick = (optionType) => {
    setExpandedOption(expandedOption === optionType ? null : optionType);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <StepTitle>Paso 1 - Contame un poco de vos</StepTitle>
            <StepDescription>¿Para qué querés invertir?</StepDescription>
            <OptionButton
              selected={investmentPurpose === 'jubilacion'}
              onClick={() => setInvestmentPurpose('jubilacion')}
            >
              Jubilación más tranquila
            </OptionButton>
            <OptionButton
              selected={investmentPurpose === 'proteger'}
              onClick={() => setInvestmentPurpose('proteger')}
            >
              Proteger sus ahorros de la inflación
            </OptionButton>
            <OptionButton
              selected={investmentPurpose === 'compra'}
              onClick={() => setInvestmentPurpose('compra')}
            >
              Proyectar una compra grande (casa/auto)
            </OptionButton>
            <OptionButton
              selected={investmentPurpose === 'otros'}
              onClick={() => setInvestmentPurpose('otros')}
            >
              Otros motivos
            </OptionButton>
          </>
        );
      case 2:
        return (
          <>
            <StepTitle>Paso 2 - ¿Cómo te manejás con la incertidumbre?</StepTitle>
            <StepDescription>¿Qué nivel de variabilidad en tus inversiones estás dispuesto a aceptar?</StepDescription>
            <OptionButton
              selected={riskTolerance === 'bajo'}
              onClick={() => setRiskTolerance('bajo')}
            >
              Prefiero ganancias moderadas pero seguras
            </OptionButton>
            <OptionButton
              selected={riskTolerance === 'medio'}
              onClick={() => setRiskTolerance('medio')}
            >
              Acepto cierta variabilidad para obtener mejores rendimientos
            </OptionButton>
            <OptionButton
              selected={riskTolerance === 'alto'}
              onClick={() => setRiskTolerance('alto')}
            >
              Estoy dispuesto a ver alta variabilidad buscando mayores ganancias
            </OptionButton>
          </>
        );
      case 3:
        return (
          <>
            <StepTitle>Paso 3 - Tu Perfil de Inversor</StepTitle>
            <ResultCard>
              <ResultTitle>
                Perfil: {investorProfile.charAt(0).toUpperCase() + investorProfile.slice(1)} Riesgo
              </ResultTitle>
              <StepDescription>
                Basado en tus respuestas, estas son las opciones de inversión recomendadas:
              </StepDescription>
              {getRecommendations().map((option, index) => (
                <InvestmentOption 
                  key={index}
                  onClick={() => handleOptionClick(option.type)}
                >
                  <OptionHeader isExpanded={expandedOption === option.type}>
                    <OptionIcon>{option.icon}</OptionIcon>
                    <div>
                      <OptionTitle>{option.type}</OptionTitle>
                      <OptionDescription>{option.description}</OptionDescription>
                    </div>
                  </OptionHeader>
                  {expandedOption === option.type && (
                    <ExpandedDetails>
                      {option.details.map((detail, idx) => (
                        <DetailItem key={idx}>{detail}</DetailItem>
                      ))}
                    </ExpandedDetails>
                  )}
                </InvestmentOption>
              ))}
            </ResultCard>
          </>
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep === 2) {
      determineInvestorProfile();
    }
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <WizardContainer>
      {renderStep()}
      <NavigationButtons>
        {currentStep > 1 && (
          <NavButton onClick={handleBack}>
            Anterior
          </NavButton>
        )}
        {currentStep < 3 && (
          <NavButton
            onClick={handleNext}
            disabled={(currentStep === 1 && !investmentPurpose) || 
                     (currentStep === 2 && !riskTolerance)}
          >
            Siguiente
          </NavButton>
        )}
      </NavigationButtons>
    </WizardContainer>
  );
};

export default InvestmentWizard;
