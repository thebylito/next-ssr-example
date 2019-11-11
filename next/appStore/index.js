import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';


import { persistStore, persistReducer } from 'redux-persist';
import reducers from './ducks';
import rootSaga from './sagas';
import { authMiddleware } from './middlewares'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, reducers);
const middlewares = [sagaMiddleware, authMiddleware];

export default () => {
  const store = createStore(
    persistedReducer,
    {},
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
};
