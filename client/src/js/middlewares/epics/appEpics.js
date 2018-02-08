import { ofType } from 'redux-observable';
import { delay, mapTo, map, mergeMap, take, merge, concat, zip, switchMap, skipWhile } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Type, Action } from 'js/actions/app';


const observeSocket = (socket, name, payload) => {
	return Observable.create(observer => {
		socket.emit(name, payload, data => {
			observer.next(data);
			observer.complete();
		});
	});
}


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
  		switchMap(action => {
  			if (socket.connected) {
  				return Observable.of(socket);
  			} else {
  				return Observable.fromEvent(socket.connect(), 'connect');
  			}
  		}),
  		switchMap(action => observeSocket(socket, 'GET_TABLES')),
  		map(tables => {
  			console.log('tables', tables);
  			return Action.connectLobbySucceed();
  		}),
	);
}

export default [
	ping,
	connectLobby,
];
