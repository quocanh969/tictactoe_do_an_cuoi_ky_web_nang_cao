import { us } from '../Services/UserService';
import { history } from '../Helpers/History';
// Playground
export const TOGGLE_SORT = 'TOGGLE_SORT';

export const ToggleSort = isASC => {
    return {
        type: TOGGLE_SORT,
        isASC
    };
};
// Playground -- Bot mode
export const RESTART = 'RESTART';
export const BACK_TO_HISTORY = 'BACK_TO_HISTORY';
export const MOVE_BOTMODE = 'MOVE_BOTMODE';

export const Restart = () => {
    return {
        type: RESTART
    };
};

export const Back2History = stepState => {
    return {
        type: BACK_TO_HISTORY,
        stepState
    };
};

export const moveBotmode = pos => {
    return {
        type: MOVE_BOTMODE,
        pos
    };
};

// Playground -- PVP mode
export const MOVE_PVPMODE = 'MOVE_PVPMODE';
export const TOGGLE_CHAT_BOX = 'TOGGLE_CHAT_BOX';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const HANDLE_UNDO = 'HANDLE_UNDO';
export const HANDO_DRAW = 'SEND_DRAW';
export const HANDO_GIVE_UP = 'SEND_GIVE_UP';

export const movePVPMode = pos => {
    return{
        type: MOVE_PVPMODE,   
        pos,     
    }
}

export const toggleChatBox = isChatBoxOpen => {
    return {
        type: TOGGLE_CHAT_BOX,
        isChatBoxOpen,
    }
}

export const receiveMessage = () => {
    return{
        type: RECEIVE_MESSAGE,        
    }
}

export const handleUndo = () => {
    return{
        type: HANDLE_UNDO,        
    }
}

export const handleDraw = () => {
    return{
        type: HANDO_DRAW,        
    }
}

export const handleGiveUp = () => {
    return{
        type: HANDO_GIVE_UP,        
    }
}

// Dashboard
export const PLAY_AGAINST_BOT = 'PLAY_AGAINST_BOT';
export const PLAY_AGAINST_HUMAN = 'PLAY_AGAINST_HUMAN';

export const playAgainstBot = () => {
    return {
        type: PLAY_AGAINST_BOT,
    }
}

export const playAgainstHuman = () => {
    return {
        type: PLAY_AGAINST_HUMAN,
    }
}

// User
export const UPDATE_INFO = 'UPDATE_INFO';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';

export const updateInfo = () => {
    return {
        type: UPDATE_INFO,
    }
}

export const changePassword = () => {
    return {
        type: CHANGE_PASSWORD,
    }
}

// Login
export const LOG_IN = 'LOG_IN';

export const logIn = () => {
    return {
        type: LOG_IN,
    }
}

// Register
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const register = (user) => {
    return dispatch => {

        dispatch(request(user));

        us.register(user)
        .then(
            user => {
                dispatch(success());
                console.log('Đăng ký thành công !!!');
            },
            error => {
                dispatch(failure(error.toString()));
                console.log('Đăng ký thất bại !!!');
            }
        )        

    }


    function request(user)
    {
        return {
            type: REGISTER_REQUEST,
            user
        }
    }

    function success()
    {
        return {
            type: REGISTER_SUCCESS,
        }
    }

    function failure(error)
    {
        return {
            type: REGISTER_FAILURE,
            error
        }
    }
}