import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logOut, updateStatus, logIn } from '../Actions/Action';
import Header from '../Components/Header';


const mapStateToProps = state => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        onLogOut:()=>{
            dispatch(logOut());
        },
        onUpdateStatus: logIn => {
            dispatch(updateStatus(logIn));
        }
    };
}

const HeaderContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header));


export default HeaderContainer;