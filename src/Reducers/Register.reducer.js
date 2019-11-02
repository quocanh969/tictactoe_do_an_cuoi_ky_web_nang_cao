import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../Actions/Action';

const initState = {
    username: '',
    password: '',
    email: '',
    yob: 0,
    gender: true,
    address: '',
}

function RegisterReducer(state = {}, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {};
    case REGISTER_SUCCESS:
      return {};
    case REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}

export default RegisterReducer;