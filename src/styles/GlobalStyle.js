import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #1a237e;
    --secondary-color: #0d47a1;
    --accent-color: #00bcd4;
    --text-color: #333;
    --light-bg: #f5f5f5;
    --border-color: #e0e0e0;
    --disabled-color: #bdc3c7;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    color: var(--text-color);
    line-height: 1.6;
    background-color: var(--light-bg);
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.3;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    font-family: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  @media (max-width: 768px) {
    html {
      font-size: 14px;
    }
  }
`

export default GlobalStyle;
