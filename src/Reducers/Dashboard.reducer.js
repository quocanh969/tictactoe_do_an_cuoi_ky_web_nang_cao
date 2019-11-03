import { PLAY_AGAINST_BOT,PLAY_AGAINST_HUMAN } from '../Actions/Action';
const initState = {
    isBotMode: true,
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
        default:
            return state;
    }
}

export default DashboardReducer;