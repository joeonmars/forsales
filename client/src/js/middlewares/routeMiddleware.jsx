import { Type, Action } from 'js/actions/app';


export default history => {

	return store => next => action => {

		const result = next( action );

		switch ( action.type ) {

			case Type.NEW_TABLE_SUCCEED:
			case Type.JOIN_TABLE_SUCCEED:
				history.push('/table');
				break;

			case Type.LEAVE_TABLE_SUCCEED:
				history.push('/playground');
				break;

			default:
				break;
		}

		return result;
	};
}
