import { connect } from 'react-redux';
import { Action } from 'js/actions/app';
import TableScreen from './TableScreen';

const mapStateToProps = (state) => {

	const {
		id,
		name,
		users,
		players,
		owner,
	} = state.app.table;

	return {
		table_id: id,
		table_name: name,
		users,
		players,
		owner,
		is_owner: (owner.id === state.app.user.id),
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
