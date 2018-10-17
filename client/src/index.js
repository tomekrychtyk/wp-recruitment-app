import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import Amplify from 'aws-amplify';

import { s3, apiGateway, cognito } from './config';

import './reset.less';
import App from './components/App';
import Routes from './routes';

import reducers from './redux/combinedReducers';
import sagaTree from './redux/sagaTree';

/* eslint-disable-next-line */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(sagaTree);

// AWS Config
Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: cognito.REGION,
    userPoolId: cognito.USER_POOL_ID,
    identityPoolId: cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: s3.REGION,
    bucket: s3.BUCKET,
    identityPoolId: cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: 'unsplashed',
        endpoint: apiGateway.URL,
        region: apiGateway.REGION,
      },
    ],
  },
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Routes />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root'),
);
