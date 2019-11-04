const initState = {
    RoomID: null,
    P1ID: null,
    P1name: null,
    P2ID: null,
    P2name: null,
    isWaiting: true,
}

function SocketReducer(state = initState, action) {
    switch (action.type) {
        case 'NEW_GAME':
            return {
                ...state,
                RoomID: action.roomId,
                isWaiting: true,
            }
        case 'PLAYER_ONE':
            return {
                ...state,
                P1ID: action.id,
                P1name: action.name,
            }
        case 'PLAYER_TWO':
            return {
                ...state,
                P2ID: action.id,
                P2name: action.name,
            }
        default:
            return state;
    }
}

export default SocketReducer;