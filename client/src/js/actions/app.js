const Type = {
	PONG: 'PONG',
	CONNECT_LOBBY: 'CONNECT_LOBBY',
	CONNECT_LOBBY_SUCCEED: 'CONNECT_LOBBY_SUCCEED',
	DISCONNECT_LOBBY: 'DISCONNECT_LOBBY',
	UPDATE_LOBBY: 'UPDATE_LOBBY',
	GET_TABLES: 'GET_TABLES',
	NEW_TABLE: 'NEW_TABLE',
	NEW_TABLE_SUCCEED: 'NEW_TABLE_SUCCEED',
	LOGIN: 'LOGIN',
	LOGIN_SUCCEED: 'LOGIN_SUCCEED',
	FETCH_USER_PROFILE: 'FETCH_USER_PROFILE',
	FETCH_USER_PROFILE_SUCCEED: 'FETCH_USER_PROFILE_SUCCEED',
	JOIN_TABLE: 'JOIN_TABLE',
	JOIN_TABLE_SUCCEED: 'JOIN_TABLE_SUCCEED',
	LEAVE_TABLE: 'LEAVE_TABLE',
	LEAVE_TABLE_SUCCEED: 'LEAVE_TABLE_SUCCEED',
}

const Action = {
	pong: () => {
		return {
			type: Type.PONG,
		}
	},

	connectLobby: () => {
		return {
			type: Type.CONNECT_LOBBY,
		}
	},

	connectLobbySucceed: () => {
		return {
			type: Type.CONNECT_LOBBY_SUCCEED,
		}
	},

	updateLobby: ({all_users, all_tables}) => {
		return {
			type: Type.UPDATE_LOBBY,
			all_users,
			all_tables,
		}
	},

	disconnectLobby: () => {
		return {
			type: Type.DISCONNECT_LOBBY,
		}
	},

	getTables: () => {
		return {
			type: Type.GET_TABLES,
		}
	},

	newTable: settings => {
		return {
			type: Type.NEW_TABLE,
			settings,
		}
	},

	newTableSucceed: table => {
		return {
			type: Type.NEW_TABLE_SUCCEED,
			table,
		}
	},

	login: platform => {
		return {
			type: Type.LOGIN,
			platform,
		}
	},

	loginSucceed: user => {
		return {
			type: Type.LOGIN_SUCCEED,
			user,
		}
	},

	fetchUserProfile: user_id => {
		return {
			type: Type.FETCH_USER_PROFILE,
			user_id,
		}
	},

	fetchUserProfileSucceed: user => {
		return {
			type: Type.FETCH_USER_PROFILE_SUCCEED,
			user,
		}
	},

	joinTable: table_id => {
		return {
			type: Type.JOIN_TABLE,
			table_id,
		}
	},

	joinTableSucceed: table_id => {
		return {
			type: Type.JOIN_TABLE_SUCCEED,
			table_id,
		}
	},

	leaveTable: table_id => {
		return {
			type: Type.LEAVE_TABLE,
			table_id,
		}
	},

	leaveTableSucceed: table_id => {
		return {
			type: Type.LEAVE_TABLE_SUCCEED,
			table_id,
		}
	},
}

export { Type, Action };
