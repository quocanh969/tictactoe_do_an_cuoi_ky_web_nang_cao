import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import myReducer from './Reducers/Reducer';
import configureSocket from './Helpers/Socket';

const MyStore = createStore(
    myReducer,
    applyMiddleware(
        thunkMiddleware,
    )
);

export const socket = configureSocket(MyStore.dispatch);

ReactDOM.render(
    <Provider store={MyStore}>
        <App />
    </Provider>
, document.getElementById('root'));

serviceWorker.unregister();
