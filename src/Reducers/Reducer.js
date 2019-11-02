import { combineReducers } from 'redux';
import PlaygroundReducer from './Playground.reducer';
import DashboardReducer from './Dashboard.reducer';

const myReducer = combineReducers(
    {
        PlaygroundReducer,
        DashboardReducer,
    }
);

export default myReducer;