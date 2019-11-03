import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logIn } from '../Actions/Action';
import Login from '../Components/Login';


const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => {            
            dispatch(logIn(user));
        },
    };
}

const LogInContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Login));


export default LogInContainer;