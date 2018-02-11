import { connect } from 'react-redux';
import LoginScreen from './LoginScreen';
import { Action } from 'js/actions/app';

const mapStateToProps = (state) => {

	return {
		user: state.app.user,
	};
}

const mapDispatchToProps = (dispatch) => {

	return {
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
)(LoginScreen);

export default Container;
