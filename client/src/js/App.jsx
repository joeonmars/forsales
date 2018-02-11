const React = require('react');
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import MemoryRouter from 'js/helpers/MemoryRouter';
import LoginScreen from 'js/screens/login';
import Playground from 'js/screens/playground';
import TableScreen from 'js/screens/table-screen';

import 'scss/global';


const App = ({ store, history }) => (
	<Provider store={store}>
		<MemoryRouter history={history}>
			<Switch>
				<Route path='/login' component={LoginScreen} />
				<Route path='/playground' component={Playground} />
				<Route path='/table' component={TableScreen} />
			</Switch>
		</MemoryRouter>
	</Provider>
);


export default App;
