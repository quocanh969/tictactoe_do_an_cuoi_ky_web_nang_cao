import { PLAY_AGAINST_BOT,PLAY_AGAINST_HUMAN } from '../Actions/Action';
const initState = {
    isBotMode: true,
    win:0,
    draw:0,
    lost:0,
}

function DashboardReducer(state = initState, action)
{
    switch(action.type)
    {
        case PLAY_AGAINST_BOT:
            {
                return {
                    ...state,
                    isBotMode: true,
                };
            }
        case PLAY_AGAINST_HUMAN:
            {
                return {
                    ...state,
                    isBotMode: false,
                };
            }
        case 'UPDATE_RESULT':
            {
                return {
                    ...state,
                    win:action.win,
                    draw:action.draw,
                    lost:action.lost,
                };
            }
        default:
            return state;
    }
}

export default DashboardReducer;