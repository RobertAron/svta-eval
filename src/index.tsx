import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MuiThemeProvider, createMuiTheme, CssBaseline } from '@material-ui/core'
import { CartContextProvider } from './CartContext';

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Questrial", "Roboto", "Helvetica", "Arial", "sans-serif"',
    overline:{ fontWeight:'bold', letterSpacing:'2px'},
    subtitle2:{ fontWeight:'bold' },
    h1: { fontFamily: '"Questrial", "Roboto", "Helvetica", "Arial", "sans-serif"' },
    h2: { fontFamily: '"Questrial", "Roboto", "Helvetica", "Arial", "sans-serif"' },
    h3: { fontFamily: '"Questrial", "Roboto", "Helvetica", "Arial", "sans-serif"' },
    h4: { fontFamily: '"Source Serif Pro", "Roboto", "Helvetica", "Arial", "sans-serif"' },
    h5: { fontFamily: '"Source Serif Pro", "Roboto", "Helvetica", "Arial", "sans-serif"' },
    h6: { fontFamily: '"Questrial", "Roboto", "Helvetica", "Arial", "sans-serif"' },
  },
  palette: {
    primary: {
      main: '#c19579',
      contrastText: '#FFF'
    },
    secondary: {
      main: '#d4aa63',
      contrastText:'#FFF'
    },
    background: {
      default: '#f6f5f3'
    }
  },
  shape: {
    borderRadius: 0
  },
  props: {
    MuiButton: {
      disableElevation: true,
    },
  }
})

ReactDOM.render(
  <React.StrictMode>
    <CartContextProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </CartContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
