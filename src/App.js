import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import InvestmentType from './pages/InvestmentType';
import InvestmentAdvice from './pages/InvestmentAdvice';
import InvestmentWizard from './components/InvestmentWizard';
import GlobalStyle from './styles/GlobalStyle';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/investment-type" element={<InvestmentType />} />
          <Route path="/investment-advice/:type" element={<InvestmentAdvice />} />
          <Route path="/investment-wizard" element={<InvestmentWizard />} />
        </Routes>
      </AppContainer>
    </>
  );
}

export default App;
