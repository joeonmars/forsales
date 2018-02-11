import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createMemoryHistory } from 'history';
import reducers from 'js/reducers';
import createRouteMiddleware from 'js/middlewares/routeMiddleware';
import epics from 'js/middlewares/epics';
import App from './App.jsx';



window.addEventListener('load', () => {

	const history = createMemoryHistory({
		initialEntries: [ '/login', '/playground' ],
		initialIndex: 0,
	});

	const middlewares = [
		createEpicMiddleware(epics),
		createRouteMiddleware(history),
	];

	const composedCreateStore = compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension(),
    )(createStore);

    const initial_state = getClientState({
	});

	const store = composedCreateStore(reducers, initial_state);

	const app_container = document.getElementById('app-container');
	ReactDOM.render(React.createElement(App, {store, history}), app_container);
});


const getClientState = () => {

	return {
		app: {
			login_pending: false,
			login_succeeded: false,
			socket: null,
			user: null,
			table: null,
			all_users: [],
			all_tables: [],
		},
	};
}
