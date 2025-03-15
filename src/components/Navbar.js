import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: var(--primary-color);
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: var(--accent-color);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: white;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: var(--accent-color);
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          <span>💰</span> FinanzasAI
        </Logo>
        <NavLinks>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/investment-wizard">Asesor</NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
