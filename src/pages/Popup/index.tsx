import React from 'react';
import Popup from './Popup';
import './index.css';
import { Store } from 'webext-redux';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const store = new Store();

Object.assign(store, {
  dispatch: store.dispatch.bind(store),
  getState: store.getState.bind(store),
  subscribe: store.subscribe.bind(store),
});

const theme = createTheme({
  palette: {
    primary: {
      main: "#757ce8"
    },
    action: {
      disabledBackground:'grey',
      disabled:'white',
  
    },
    root: {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white', // Change outline color
      },
    }
  }
});

store.ready().then(() => {
  const container = document.getElementById('popup');
  if (container) {
    const root = createRoot(container);
    root.render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
        <HashRouter>
          <Popup />
        </HashRouter>
        </ThemeProvider>
      </Provider>
    );
  }
});
