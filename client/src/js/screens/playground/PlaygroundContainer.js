import { connect } from 'react-redux';
import Playground from './Playground';
import { Action } from 'js/actions/app';

const mapStateToProps = (state) => {

	return {
		user: state.app.user,
		all_users: state.app.all_users,
		all_tables: state.app.all_tables,
		table: state.app.table,
	};
}

const mapDispatchToProps = (dispatch) => {

	return {
		connectLobby: () => {
			dispatch(Action.connectLobby());
		},
		newTable: settings => {
			dispatch(Action.newTable(settings));
		},
		joinTable: table_id => {
			dispatch(Action.joinTable(table_id));
		},
	};
}

const Container = connect(
	mapStateToProps,
	mapDispatchToProps
)(Playground);

export default Container;
