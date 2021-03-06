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
    secondary: teal,
    primary: {
      main: '#00bcd4'
    },
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
      },
      flexContainer: {
        paddingRight: '6px'
      }
    },
    MuiTab: {
      root: {
        fontSize: '1rem'
      },
      labelContainer: {
        boxSizing: 'content-box'
      },
      fullWidth: {
        minWidth: '0'
      }
    },
    MuiDialogActions: {
      root: {
        margin: '8px 10px',
        marginBottom: '40px'
      }
    }
  }
});

window.onscroll = function() {
console.log('Scrolling');
};

const Root = () => (
  <Provider store={store}>
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
  </Provider>
);

render(<Root />, document.getElementById('root'));
