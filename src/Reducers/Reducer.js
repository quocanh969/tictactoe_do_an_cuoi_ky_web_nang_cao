import { combineReducers } from 'redux';
import PlaygroundReducer from './Playground.reducer';
import DashboardReducer from './Dashboard.reducer';
import RegisterReducer from './Register.reducer';
import LogInReducer from './Login.reducer';

const myReducer = combineReducers(
    {
        PlaygroundReducer,
        DashboardReducer,
        RegisterReducer,
        LogInReducer,
    }
);

export default myReducer;