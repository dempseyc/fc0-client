import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from './configureStore';

import App from './containers/App';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import cyan from '@material-ui/core/colors/cyan';

// require('dotenv').config();

const store = configureStore();


// typography is injecting, not pallette
const theme = createMuiTheme({
  palette: {
    primary: cyan,
    secondary: teal,
  },
  typography: {
    fontFamily: 'sans-serif',
    fontSize: 20,
    useNextVariants: true,
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    MuiFab: {
      root: {
        width: '25%',
        fontSize: 15,
        margin: '0.5rem',
        padding: '0.5rem',
      },
      label: {
          color: '#ffffff',
      },
    },
    MuiButton: {
      raisedPrimary: {
        color: '#ffffff',
      },
      raisedSecondary: {
        color: '#ffffff',
      },
      root: {
        margin: '0.1rem',
      },
    },
    MuiPrivateTabIndicator: {
      root: {
        boxShadow: '0 0 0.25rem 0.25rem #1de9b660',
      },
    },
    MuiTabs: {
      fixed: {
        width: '100vw'
      }
    }
  }
});

// const theme = createMuiTheme({
//   overrides: {
//     MuiButton: { // Name of the component ⚛️ / style sheet
//       text: { // Name of the rule
//         color: 'white', // Some CSS
//       },
//     },
//   },
// });

const Root = () => (
  <Provider store={store}>
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
  </Provider>
);

render(<Root />, document.getElementById('root'));
