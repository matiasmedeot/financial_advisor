import React from 'react';
import { useParams } from 'react-router-dom';
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
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  color: var(--primary-color);
  font-size: 2.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const AdviceSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  color: var(--secondary-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const List = styled.ul`
  list-style-position: inside;
  margin: 1rem 0;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
  line-height: 1.6;
`;

const ChatSection = styled.div`
  margin-top: 3rem;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const investmentAdvice = {
  stocks: {
    title: 'Inversión en Acciones',
    description: 'Las acciones representan una parte de la propiedad de una empresa y pueden ofrecer rendimientos a través de la apreciación del precio y dividendos.',
    recommendations: [
      'Diversifica tu portafolio entre diferentes sectores y regiones',
      'Considera ETFs para una exposición más amplia al mercado',
      'Investiga bien las empresas antes de invertir',
      'Ten un horizonte de inversión a largo plazo'
    ],
    risks: [
      'Volatilidad del mercado',
      'Riesgo específico de la empresa',
      'Condiciones económicas generales'
    ]
  },
  bonds: {
    title: 'Inversión en Bonos',
    description: 'Los bonos son instrumentos de deuda que proporcionan pagos periódicos de intereses y la devolución del principal al vencimiento.',
    recommendations: [
      'Diversifica entre bonos gubernamentales y corporativos',
      'Considera la calificación crediticia del emisor',
      'Evalúa el plazo y la tasa de interés',
      'Ten en cuenta la inflación'
    ],
    risks: [
      'Riesgo de tasa de interés',
      'Riesgo de crédito',
      'Riesgo de inflación'
    ]
  },
  'real-estate': {
    title: 'Inversión en Bienes Raíces',
    description: 'La inversión inmobiliaria puede proporcionar ingresos regulares a través de alquileres y apreciación del capital a largo plazo.',
    recommendations: [
      'Evalúa la ubicación y el potencial de crecimiento',
      'Considera los costos de mantenimiento y gestión',
      'Diversifica entre diferentes tipos de propiedades',
      'Investiga las tendencias del mercado local'
    ],
    risks: [
      'Baja liquidez',
      'Costos de mantenimiento',
      'Cambios en el mercado inmobiliario'
    ]
  },
  crypto: {
    title: 'Inversión en Criptomonedas',
    description: 'Las criptomonedas son activos digitales que pueden ofrecer alto potencial de rendimiento pero también conllevan riesgos significativos.',
    recommendations: [
      'Invierte solo lo que puedas permitirte perder',
      'Diversifica entre diferentes criptomonedas',
      'Mantén tus activos en wallets seguros',
      'Mantente informado sobre desarrollos tecnológicos'
    ],
    risks: [
      'Alta volatilidad',
      'Riesgos regulatorios',
      'Riesgos de seguridad'
    ]
  }
};

const InvestmentAdvice = () => {
  const { type } = useParams();
  const advice = investmentAdvice[type];

  if (!advice) {
    return (
      <Container>
        <Content>
          <Header>
            <Title>Tipo de inversión no encontrado</Title>
          </Header>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <Header>
          <Title>{advice.title}</Title>
          <p>{advice.description}</p>
        </Header>

        <AdviceSection>
          <SectionTitle>Recomendaciones Principales</SectionTitle>
          <List>
            {advice.recommendations.map((rec, index) => (
              <ListItem key={index}>{rec}</ListItem>
            ))}
          </List>
        </AdviceSection>

        <AdviceSection>
          <SectionTitle>Riesgos a Considerar</SectionTitle>
          <List>
            {advice.risks.map((risk, index) => (
              <ListItem key={index}>{risk}</ListItem>
            ))}
          </List>
        </AdviceSection>

        <ChatSection>
          <SectionTitle>¿Tienes más preguntas?</SectionTitle>
          <p>
            Nuestro asistente virtual está aquí para ayudarte a resolver todas tus dudas
            sobre inversiones. ¡Pregunta lo que necesites!
          </p>
        </ChatSection>
      </Content>
    </Container>
  );
};

export default InvestmentAdvice;
