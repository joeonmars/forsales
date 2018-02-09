import { connect } from 'react-redux';
import Playground from './Playground';
import { Action } from 'js/actions/app';

const mapStateToProps = (state) => {

	return {
		login_pending: state.app.login_pending,
		login_succeeded: state.app.login_succeeded,
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
		loginWithFacebook: () => {
			dispatch(Action.login('facebook'));
		},
	};
}

const Container = connect(
	mapStateToProps,
	mapDispatchToProps
)(Playground);

export default Container;
