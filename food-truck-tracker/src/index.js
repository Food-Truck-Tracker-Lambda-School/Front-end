import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware, Provider } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from './reducers/rootReducer';

import './index.css';
import App from './App';

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
