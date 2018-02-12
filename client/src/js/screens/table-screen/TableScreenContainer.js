import { connect } from 'react-redux';
import { Action } from 'js/actions/app';
import TableScreen from './TableScreen';

const mapStateToProps = (state) => {

	return {
		table: state.app.table,
	};
}

const mapDispatchToProps = (dispatch) => {

	return {
		leaveTable: table_id => {
			dispatch(Action.leaveTable(table_id));
		},
	};
}

const Container = connect(
	mapStateToProps,
	mapDispatchToProps
)(TableScreen);

export default Container;
