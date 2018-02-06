const React = require('react');
import { Provider } from 'react-redux';
import { HashRouter as Router, Switch } from 'react-router-dom';
import Playground from 'js/screens/playground';

import 'scss/global';


const App = ({ store, history }) => (
	<Provider store={store}>
		<Router>
			<Switch>
				<Playground />
			</Switch>
		</Router>
	</Provider>
);


export default App;
