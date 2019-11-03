import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE } from '../Actions/Action';

const initState = {
  status: 0,
  message: '',
  loading: false,
}

function RegisterReducer(state = initState, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        ...state,
        status: 0,
        message: '',
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        status: 1,
        message: action.message,
        loading: false,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        status: -1,
        message: action.message,
        loading: false,
      };
    default:
      return state;
  }
}

export default RegisterReducer;