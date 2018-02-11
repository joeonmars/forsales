import io from 'socket.io-client';
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

      const socket = window.socket = io('http://localhost:4200/lobby', {
        autoConnect: false,
        reconnection: false,
        query: {
          user_id: action.user.id,
        },
      });

  		return {
  			...state,
  			login_pending: false,
  			login_succeeded: true,
        socket,
        user: action.user,
  		};
  		break;

    case Type.UPDATE_LOBBY:
      return {
        ...state,
        all_users: action.all_users,
      }

    default:
    	return state;
  }
};

export default appReducer;
