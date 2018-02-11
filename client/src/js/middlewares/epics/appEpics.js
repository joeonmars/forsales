import { ofType } from 'redux-observable';
import { delay, mapTo, map, mergeMap, takeUntil, skipWhile, merge, catchError, zip, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import Popup from 'popup-window';
import { Type, Action } from 'js/actions/app';


const getSocket = (store) => {
	return store.getState().app.socket;
}


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

	return action$.pipe(
  		ofType(Type.CONNECT_LOBBY),
  		switchMap(action => {
				const socket = getSocket(store);
  			socket.sendBuffer.length = 0;
  			socket.receiveBuffer.length = 0;

  			if (socket.connected) {
  				return Observable.of(socket);
  			} else {
  				return Observable.fromEvent(socket.connect(), 'connect');
  			}
  		}),
  		map(socket => {
  			return Action.connectLobbySucceed();
  		}),
	);
}

const disconnectLobby = (action$, store) => {

	return action$.pipe(
  		ofType(Type.CONNECT_LOBBY),
  		switchMap(action => {
  			const socket = getSocket(store);
  			return Observable.fromEvent(socket, 'disconnect');
  		}),
  		map(() => {
  			return Action.disconnectLobby();
  		}),
	);
}

const updateLobby = (action$, store) => {

	return action$.pipe(
  		ofType(Type.CONNECT_LOBBY_SUCCEED),
  		switchMap(action => {
  			const socket = getSocket(store);
  			return Observable.fromEvent(socket, 'UPDATE_LOBBY');
  		}),
  		map(({tables, users}) => {
  			return Action.updateLobby({
  				tables,
  				users,
  			});
  		}),
	);
}

const login = (action$, store) => {

	return action$.pipe(
		ofType(Type.LOGIN),
		switchMap(action =>
			Observable.of({
				popup: new Popup(`http://localhost:4200/login/${action.platform}`).open(),
				action,
			})
		),
  		switchMap(({popup, action}) => 
			Observable.fromEvent(window, 'message')
				.skipWhile(e => {
					if (e.data && e.data.type === 'LOGIN_SUCCESS') {
						popup.close();
						return false;
					} else {
						return true;
					}
				})
				.takeUntil(action$.ofType(Type.LOGIN_SUCCEED))
  		),
		switchMap(e => {
			const user_id = e.data.id;
			console.log(`user_id is ${user_id}`);
			return ajax.getJSON(`http://localhost:4200/user/${user_id}`);
		}),
		map(response => {
			return Action.loginSucceed(response);
		}),
	);
}

const newTable = (action$, store) => {

	return action$.pipe(
  		ofType(Type.NEW_TABLE),
  		switchMap(action => {
  			const socket = getSocket(store);
  			return observeSocket(socket, 'NEW_TABLE', action.settings);
  		}),
  		map(table => {
  			console.log('table', table);
  			return Action.newTableSucceed(table);
  		}),
	);
}

export default [
	ping,
	login,
	connectLobby,
	disconnectLobby,
	updateLobby,
	newTable,
];
