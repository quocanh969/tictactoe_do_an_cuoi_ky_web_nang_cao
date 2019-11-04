import { combineReducers } from 'redux';
import PlaygroundReducer from './Playground.reducer';
import DashboardReducer from './Dashboard.reducer';
import RegisterReducer from './Register.reducer';
import LogInReducer from './Login.reducer';
import HeaderReducer from './Header.reducer';
import UserReducer from './User.reducer';
import SocketReducer from './Socket.reducer';

const myReducer = combineReducers(
    {
        PlaygroundReducer,
        DashboardReducer,
        RegisterReducer,
        LogInReducer,
        HeaderReducer,        
        UserReducer,
        SocketReducer,
    }
);

export default myReducer;