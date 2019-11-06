const initState = {
    Player: 0,
    P1ID: null,
    P1name: null,
    P2ID: null,
    P2name: null,
    isWaiting: false,
    pauseGame: false,
    undoRequest: false,
    drawRequest: false,
    giveUpRequest: false,
    chatMessages: [],
}

function SocketReducer(state = initState, action) {
    switch (action.type) {
        case 'NEW_GAME':
            return {
                ...state,
                isWaiting: true,
            }
        case 'PLAYER_ONE':
            return {
                ...state,
                Player: 1,
                P1ID: action.P1ID,
                P1name: action.P1name,
                P2ID: action.P2ID,
                P2name: action.P2name,
                isWaiting: false,
            }
        case 'PLAYER_TWO':
            return {
                ...state,
                Player: 2,
                P1ID: action.P1ID,
                P1name: action.P1name,
                P2ID: action.P2ID,
                P2name: action.P2name,
                isWaiting: false,
            }
        // =================================================================
        case 'PAUSE_GAME':
            return {
                ...state,
                pauseGame: true,
                isWaiting: false,
            }
        case 'RECEIVE_UNDO_REQUEST':
            return {
                ...state,
                undoRequest: true,
                isWaiting: false,
            }
        case 'RECEIVE_DRAW_REQUEST':
            return {
                ...state,
                drawRequest: true,
                isWaiting: false,
            }        
        // =================================================================
        case 'RESUME_GAME':
            return {
                ...state,
                pauseGame: false,
                isWaiting: false,
            }
        case 'ANSWER_UNDO_REQUEST':
            return {
                ...state,
                undoRequest: false,
                isWaiting: false,
            }
        case 'ANSWER_DRAW_REQUEST':
            return {
                ...state,
                drawRequest: false,
                isWaiting: false,
            }        
        // =================================================================
        case 'RECEIVE_GIVE_UP_REQUEST':
                return {
                    ...state,
                    giveUpRequest: true,
                    isWaiting: false,
                }
        // =================================================================
        case 'RECEIVE_CHAT_MESSAGE':
            let temp = state.chatMessages.slice();
            temp.push({id:action.id,message:action.message});            
            return {
                ...state,
                chatMessages:temp,
                isWaiting: false,
            }
        case 'UPDATE_SOCKET_STATE_INFO':
            {
                return {
                    ...state,
                    Player:action.Player,
                    P1ID: action.P1ID,
                    P1name: action.P1name,
                    P2ID: action.P2ID,
                    P2name: action.P2name,            
                    chatMessages: action.chatMessages,
                }
            } 
        case 'RESTART_MESSAGES':
            {
                return {
                    ...state,
                    chatMessages: [],
                }
            }    
        default:
            return state;
    }
}

export default SocketReducer;