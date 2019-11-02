import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { register } from '../Actions/Action';
import Register from '../Components/Register';

const mapStateToProps = state => {
    return state;
  };
  
  const mapDispatchToProps = dispatch => {
    return {
          onRegister: (name, password, email, YoB, gender, address) => {                        
              dispatch(register({name, password, email, YoB, gender, address}));                        
          },
      };
  }
  
  const RegisterContainer = withRouter(connect(
      mapStateToProps,
      mapDispatchToProps
    )(Register));
  
  
  export default RegisterContainer;