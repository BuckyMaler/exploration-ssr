import './client.css';
import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';

const { __PRELOADED_PROPS__ } = window as any;

hydrate(
  <React.StrictMode>
    <Provider store={store}>
      <App {...__PRELOADED_PROPS__} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
