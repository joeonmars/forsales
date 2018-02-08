import { connect } from 'react-redux';
import Playground from './Playground';
import { Action } from 'js/actions/app';

const mapStateToProps = (state) => {

	return {
		is_pinging: state.app.is_pinging,
	};
}

const mapDispatchToProps = (dispatch) => {

	return {
		ping: () => {
			dispatch(Action.ping());
		},
		connectLobby: () => {
			dispatch(Action.connectLobby());
		},
		newTable: settings => {
			dispatch(Action.newTable(settings));
		},
	};
}

const Container = connect(
	mapStateToProps,
	mapDispatchToProps
)(Playground);

export default Container;
