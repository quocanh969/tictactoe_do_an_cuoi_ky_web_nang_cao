import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Playground from "../Components/Playground";

import { moveBotmode,Restart,ToggleSort,Back2History,toggleChatBox } from '../Actions/Action';

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {
        onMoveOnBotmode: pos => {
            dispatch(moveBotmode(pos));
        },
        onToggleChatBox: isChatBoxOpen => {
            dispatch(toggleChatBox(isChatBoxOpen));
        },
        onRestart: () => {
            dispatch(Restart());
        },
        onToggleSort: isASC => {
            dispatch(ToggleSort(isASC));
        },
        onBack2History: stepState => {
            dispatch(Back2History(stepState));
        },
    }
}

const PlaygroundContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Playground));

export default PlaygroundContainer;