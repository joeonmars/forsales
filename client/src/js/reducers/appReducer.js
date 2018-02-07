import { Type } from 'js/actions/app';


const appReducer = (state = {}, action) => {

  switch (action.type) {
  	case Type.PING:
  		return {
  			...state,
  			is_pinging: true,
  		};
  		break;

  	case Type.PONG:
  		return {
  			...state,
  			is_pinging: false,
  		};
  		break;

    default:
    	return state;
  }
};

export default appReducer;
