import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { playAgainstBot,playAgainstHuman } from '../Actions/Action';

import Dashboard from "../Components/Dashboard";

const mapStateToProps = state => {
    return state;
}

const mapDispatchToProps = dispatch => {
    return {
        onPlayBotMode: () => {
            dispatch(playAgainstBot());
        },
        onPlayPVPMode: () => {
            dispatch(playAgainstHuman());
        },
    }
}

const DashboardContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard));

export default DashboardContainer;