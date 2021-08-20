import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { initStore } from '../app/store';

function App({ Component, pageProps }: AppProps) {
  const store = initStore(pageProps.preloadedState);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </React.StrictMode>
  );
}

export default App;
