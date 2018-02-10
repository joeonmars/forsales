import { connect } from 'react-redux';
import Playground from './Playground';
import { Action } from 'js/actions/app';

const mapStateToProps = (state) => {

	return {
		user: state.app.user,
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
		loginWithTwitter: () => {
			dispatch(Action.login('twitter'));
		},
	};
}

const Container = connect(
	mapStateToProps,
	mapDispatchToProps
)(Playground);

export default Container;
