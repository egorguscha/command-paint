import {css, createGlobalStyle} from 'styled-components'

const vars = css`
  :root {
    --font-size-14: 14px;
    --font-size-16: 16px;
    --font-size-18: 18px;
    --font-size-20: 20px;

    --primary-black: #000;
    --primary-black-hover: #474747;
    --primary-blue: #374ad3;
    --disabled: #bfbfbf;
  }
`
export const GlobalStyle = createGlobalStyle`
  ${vars}

  html,body {
    font-size: var(--font-size-16);
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    padding: 0;
    margin: 0;
    height: 100vh;
    overflow: hidden;

  }

  #root {
    height: 100%;
  }

  button,input,textarea {
    font-size: var(--font-size-16);
    box-sizing: border-box;
    border: none;
    &:focus {
      outline: none;
    }

  }
`
