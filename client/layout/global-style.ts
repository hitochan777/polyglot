import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
      margin: 0;
      padding: 0;
      font-family: sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
`;
