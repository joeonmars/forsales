import { ofType } from 'redux-observable';
import { delay, mapTo, map, mergeMap, takeUntil, merge, catchError, zip, switchMap } from 'rxjs/operators';
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
  			socket.sendBuffer.length = 0;
  			socket.receiveBuffer.length = 0;

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

const disconnectLobby = (action$, store) => {

	const {
		socket,
	} = store.getState().app;

	return action$.pipe(
  		ofType(Type.CONNECT_LOBBY),
  		switchMap(action => Observable.fromEvent(socket, 'disconnect')),
  		map(() => {
  			return Action.disconnectLobby();
  		}),
	);
}

const newTable = (action$, store) => {

	const {
		socket,
	} = store.getState().app;

	return action$.pipe(
  		ofType(Type.NEW_TABLE),
  		switchMap(action => observeSocket(socket, 'NEW_TABLE', action.settings)),
  		map(table => {
  			console.log('table', table);
  			return Action.newTableSucceed(table);
  		}),
	);
}

export default [
	ping,
	connectLobby,
	disconnectLobby,
	newTable,
];
