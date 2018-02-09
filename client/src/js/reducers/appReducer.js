import { Type } from 'js/actions/app';


const appReducer = (state = {}, action) => {

  switch (action.type) {
  	case Type.LOGIN:
  		return {
  			...state,
  			login_pending: true,
  			login_succeeded: false,
  		};
  		break;

  	case Type.LOGIN_SUCCEED:
  		return {
  			...state,
  			login_pending: false,
  			login_succeeded: true,
  		};
  		break;

    default:
    	return state;
  }
};

export default appReducer;
