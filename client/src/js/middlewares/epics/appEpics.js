import { ofType } from 'redux-observable';
import { delay, mapTo, map, mergeMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Type, Action } from 'js/actions/app';


const ping = (action$, store) => {
	return action$.pipe(
  		ofType(Type.PING),
  		delay(1000),
		mapTo(Action.pong()),
	);
}

const connectLobby = (action$, store) => {

	const {
		socket,
	} = store.getState().app;

	return action$.pipe(
  		ofType(Type.CONNECT_LOBBY),
  		mergeMap(action => {
  			socket.open();
  			return Observable.fromEvent(socket, 'connect');
  		}),
  		map(() => {
  			socket.emit('GET_TABLES');
  			return Action.connectLobbySucceed();
  		}),
  		//mergeMap(action => Observable.fromEvent(socket, 'LIST_TABLES')),
  		//mapTo(Action.listTables()),
	);
}

export default [
	ping,
	connectLobby,
];
