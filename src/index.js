import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import {createBrowserHistory} from 'history';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import myReducer from './Reducers/Reducer';

const MyStore = createStore(
    myReducer,
    applyMiddleware(
        thunkMiddleware,
    )
);

ReactDOM.render(
    <Provider store={MyStore}>
        <App />
    </Provider>
, document.getElementById('root'));

serviceWorker.unregister();
