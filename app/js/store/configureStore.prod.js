import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/index';

// Middleware you want to use in production:
//const enhancer = applyMiddleware(p1, p2, p3);

export default function configureStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  return createStore(rootReducer, initialState);
};
