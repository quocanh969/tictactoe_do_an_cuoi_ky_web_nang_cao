import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { register,noticeFail } from '../Actions/Action';
import Register from '../Components/Register';

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: user => {
      dispatch(register(user));
    },
    onNoticeFail: message => {
      dispatch(noticeFail(message));
    }
  };
}

const RegisterContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Register));


export default RegisterContainer;