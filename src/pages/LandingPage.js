import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: calc(100vh - 70px);
`;

const Hero = styled.section`
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 4rem 2rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Button = styled.button`
  background-color: var(--accent-color);
  color: white;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const Features = styled.section`
  padding: 4rem 2rem;
  background-color: var(--light-bg);

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const FeaturesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Hero>
        <HeroContent>
          <Title>Tu Futuro Financiero Comienza Aquí</Title>
          <Subtitle>
            Asesoría financiera personalizada con la ayuda de inteligencia artificial
          </Subtitle>
          <Button onClick={() => navigate('/investment-wizard')}>
            Comenzar Ahora
          </Button>
        </HeroContent>
      </Hero>

      <Features>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>💡</FeatureIcon>
            <FeatureTitle>Asesoría Experta</FeatureTitle>
            <p>Recibe consejos personalizados basados en tus objetivos financieros</p>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🤖</FeatureIcon>
            <FeatureTitle>IA Avanzada</FeatureTitle>
            <p>Utilizamos tecnología de punta para analizar las mejores opciones de inversión</p>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>📈</FeatureIcon>
            <FeatureTitle>Seguimiento Continuo</FeatureTitle>
            <p>Monitorea y ajusta tus inversiones con recomendaciones en tiempo real</p>
          </FeatureCard>
        </FeaturesGrid>
      </Features>
    </Container>
  );
};

export default LandingPage;
