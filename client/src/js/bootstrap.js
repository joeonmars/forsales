import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import createHashHistory from 'history/createHashHistory';
import reducers from 'js/reducers';
import App from './App.jsx';


window.addEventListener('load', () => {

	const middlewares = [];

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

		},
	};
}
