import { connect } from 'react-redux';
import { Action } from 'js/actions/app';
import TableScreen from './TableScreen';

const mapStateToProps = (state) => {

	return {

	};
}

const mapDispatchToProps = (dispatch) => {

	return {
		
	};
}

const Container = connect(
	mapStateToProps,
	mapDispatchToProps
)(TableScreen);

export default Container;
