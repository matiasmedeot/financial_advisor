import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: calc(100vh - 70px);
  padding: 4rem 2rem;
  background: var(--light-bg);

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h2`
  color: var(--primary-color);
  font-size: 2.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const OptionCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const OptionIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const OptionTitle = styled.h3`
  color: var(--secondary-color);
  margin-bottom: 1rem;
`;

const OptionDescription = styled.p`
  color: var(--text-color);
  font-size: 1rem;
  line-height: 1.6;
`;

const investmentOptions = [
  {
    id: 'stocks',
    icon: '📈',
    title: 'Acciones',
    description: 'Invierte en empresas y crece con ellas. Ideal para inversiones a largo plazo con potencial de alto rendimiento.'
  },
  {
    id: 'bonds',
    icon: '🏦',
    title: 'Bonos',
    description: 'Inversiones más seguras con rendimientos fijos. Perfectas para un perfil conservador.'
  },
  {
    id: 'real-estate',
    icon: '🏠',
    title: 'Bienes Raíces',
    description: 'Inversiones en propiedades y fondos inmobiliarios. Combina ingresos pasivos con apreciación de capital.'
  },
  {
    id: 'crypto',
    icon: '💰',
    title: 'Criptomonedas',
    description: 'Mercado emergente con alto potencial y riesgo. Para inversores que buscan diversificación y oportunidades innovadoras.'
  }
];

const InvestmentType = () => {
  const navigate = useNavigate();

  const handleOptionClick = (investmentType) => {
    navigate(`/investment-advice/${investmentType}`);
  };

  return (
    <Container>
      <Content>
        <Title>¿En qué te gustaría invertir?</Title>
        <p>Selecciona el tipo de inversión que más te interese para recibir asesoría personalizada</p>
        
        <OptionsGrid>
          {investmentOptions.map((option) => (
            <OptionCard
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
            >
              <OptionIcon>{option.icon}</OptionIcon>
              <OptionTitle>{option.title}</OptionTitle>
              <OptionDescription>{option.description}</OptionDescription>
            </OptionCard>
          ))}
        </OptionsGrid>
      </Content>
    </Container>
  );
};

export default InvestmentType;
