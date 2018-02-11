const React = require('react');
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import LoginScreen from 'js/screens/login';
import Playground from 'js/screens/playground';

import 'scss/global';


const App = ({ store, history }) => (
	<Provider store={store}>
		<MemoryRouter
			initialEntries={[ '/login', '/playground' ]}
  			initialIndex={0}
  		>
			<Switch>
				<Route path='/login' component={LoginScreen} />
				<Route path='/playground' component={Playground} />
			</Switch>
		</MemoryRouter>
	</Provider>
);


export default App;
