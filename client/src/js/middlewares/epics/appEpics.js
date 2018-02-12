import { ofType } from 'redux-observable';
import { delay, mapTo, map, mergeMap, takeUntil, skipWhile, merge, catchError, zip, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import Popup from 'popup-window';
import { Type, Action } from 'js/actions/app';


const getSocket = (store) => {
	return store.getState().app.socket;
}


const observeSocketEmit = (socket, name, payload) => {
	return Observable.create(observer => {
		socket.emit(name, payload, data => {
			observer.next(data);
			observer.complete();
		});
	});
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
  				all_tables: tables,
  				all_users: users,
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
  			return observeSocketEmit(socket, 'NEW_TABLE', action.settings);
  		}),
  		map(table => {
  			return Action.newTableSucceed(table);
  		}),
	);
}

const joinTable = (action$, store) => {

	return action$.pipe(
  		ofType(Type.JOIN_TABLE),
  		switchMap(action => {
  			const socket = getSocket(store);
  			return observeSocketEmit(socket, 'JOIN_TABLE', action.table_id);
  		}),
  		map(table_id => {
  			return Action.joinTableSucceed(table_id);
  		}),
	);
}

const leaveTable = (action$, store) => {

	return action$.pipe(
  		ofType(Type.LEAVE_TABLE),
  		switchMap(action => {
  			const socket = getSocket(store);
  			return observeSocketEmit(socket, 'LEAVE_TABLE', action.table_id);
  		}),
  		map(table_id => {
  			return Action.leaveTableSucceed(table_id);
  		}),
	);
}

const updateTable = (action$, store) => {

	return action$.pipe(
  		ofType(Type.NEW_TABLE_SUCCEED, Type.JOIN_TABLE_SUCCEED),
  		switchMap(action => {
  			const socket = getSocket(store);
  			return Observable.fromEvent(socket, 'UPDATE_TABLE')
  				.takeUntil(action$.ofType(Type.LEAVE_TABLE_SUCCEED));
  		}),
  		map(table => {
  			return Action.updateTable(table);
  		}),
	);
}

export default [
	login,
	connectLobby,
	disconnectLobby,
	updateLobby,
	newTable,
	joinTable,
	leaveTable,
	updateTable,
];
