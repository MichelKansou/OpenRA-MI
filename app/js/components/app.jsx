import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'
import Main from './main'


import DevTools from '../containers/DevTools';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
      <div className="app-container">
          <Main />
          <DevTools />
      </div>
  </Provider>,
  document.getElementById('app')
);
