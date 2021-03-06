import React from 'react';
import { Provider } from 'react-redux';
import App from 'next/app';
import { PersistGate } from 'redux-persist/integration/react';

import configureStore from '../appStore';

let reduxStore;
const getOrInitializeStore = initialState => {
  // Always make a new store if server, otherwise state is shared between requests
  if (typeof window === 'undefined') {
    return configureStore(initialState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!reduxStore) {
    reduxStore = configureStore(initialState);
  }
  return reduxStore;
};

const withRedux = (PageComponent, { ssr = true } = {}) => {
  const WithRedux = ({ initialReduxState, ...props }) => {
    const { store, persistor } = getOrInitializeStore(initialReduxState);
    return (
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <PageComponent {...props} />
        {/* </PersistGate> */}
      </Provider>
    );
  };

  // Make sure people don't use this HOC on _app.js level
  if (process.env.NODE_ENV !== 'production') {
    const isAppHoc = PageComponent === App || PageComponent.prototype instanceof App;
    if (isAppHoc) {
      throw new Error('The withRedux HOC only works with PageComponents');
    }
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';

    WithRedux.displayName = `withRedux(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithRedux.getInitialProps = async context => {
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      reduxStore = getOrInitializeStore();

      // Provide the store to getInitialProps of pages
      // eslint-disable-next-line no-param-reassign
      context.reduxStore = reduxStore.store;

      // Run getInitialProps from HOCed PageComponent
      const pageProps =
        typeof PageComponent.getInitialProps === 'function'
          ? await PageComponent.getInitialProps(context, context.reduxStore)
          : {};
      // Pass props to PageComponent
      console.log(context.reduxStore.getState());
      return {
        ...pageProps,
        initialReduxState: context.reduxStore.getState(),
      };
    };
  }

  return WithRedux;
};

export default withRedux;
