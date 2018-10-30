import React, {Component} from 'react';
import AppStack from './src/routes/AppStack';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import rootReducer from './src/reducer';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const client = axios.create({
  baseURL: 'http://api.goka.online',
  responseType: 'json',
  headers: {
    'Authorization': 'Bearer YmI3OGJhZjdhMGI1ZTY5NzE1MjRjMTRmNWJkMzYxYjgzNTI5MWJkMTZiNGRiNTBlNTZiMGVkNTdlOTIxZDUwYw'
  }
});

const store = createStore(rootReducer, applyMiddleware(axiosMiddleware(client), thunk, logger));

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <AppStack/>
      </Provider>
    );
  }
}