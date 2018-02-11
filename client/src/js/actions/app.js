const Type = {
	PING: 'PING',
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
}

const Action = {
	ping: () => {
		return {
			type: Type.PING,
		}
	},

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

	updateLobby: ({tables, users}) => {
		return {
			type: Type.UPDATE_LOBBY,
			all_users: users,
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
}

export { Type, Action };
