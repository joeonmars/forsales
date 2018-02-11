import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import createHashHistory from 'history/createHashHistory';
import reducers from 'js/reducers';
import epics from 'js/middlewares/epics';
import App from './App.jsx';


window.addEventListener('load', () => {

	const middlewares = [
		createEpicMiddleware(epics),
	];

	const composedCreateStore = compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension(),
    )(createStore);

    const history = createHashHistory();

    const initial_state = getClientState({
		history
	});

	const store = composedCreateStore(reducers, initial_state);

	const app_container = document.getElementById('app-container');
	ReactDOM.render(React.createElement(App, {store, history}), app_container);
});


const getClientState = ({history}) => {

	return {
		app: {
			login_pending: false,
			login_succeeded: false,
			socket: null,
			user: null,
			all_users: [],
			all_tables: [],
		},
	};
}
