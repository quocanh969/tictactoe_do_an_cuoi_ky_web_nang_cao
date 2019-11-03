import { UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE,CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE, CHANGE_AVATAR } from '../Actions/Action';

const initState = {
    changePassSta: 0,
    changePassMess: '',
    status: 0,
    message: '',
    url:'',
    loading: false,
}

function UserReducer(state = initState, action) {
    switch (action.type) {
        case UPDATE_REQUEST:
            return {
                ...state,
                status: 0,
                message: '',
                loading: true,
            };
        case UPDATE_SUCCESS:
            return {
                ...state,
                status: 1,
                message: action.message,
                loading: false,
            };
        case UPDATE_FAILURE:
            return {
                ...state,
                status: -1,
                message: action.message,
                loading: false,
            };
        case CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                changePassSta: 0,
                changePassMess: '',
                loading: true,
            };
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                changePassSta: 1,
                changePassMess: action.message,
                loading: false,
            };
        case CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                changePassSta: -1,
                changePassMess: action.message,
                loading: false,
            };
        case CHANGE_AVATAR:
            return {
                ...state,
                url: action.url,
            }
        default:
            return state;
    }
}

export default UserReducer;