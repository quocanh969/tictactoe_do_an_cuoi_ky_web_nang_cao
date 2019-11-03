import { LOG_OUT, UPDATE_STATUS } from '../Actions/Action';

const initState = {
    isLogin: true,
}

function HeaderReducer(state = {}, action) {
    switch (action.type) {
        case LOG_OUT:
            return {
                ...state,
                isLogin: false,
            }
        case UPDATE_STATUS:
            return {
                ...state,
                isLogin: action.login,
            }
        default:
            return state;
    }
}

export default HeaderReducer;