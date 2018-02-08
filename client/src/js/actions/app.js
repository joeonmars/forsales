const Type = {
	PING: 'PING',
	PONG: 'PONG',
	CONNECT_LOBBY: 'CONNECT_LOBBY',
	CONNECT_LOBBY_SUCCEED: 'CONNECT_LOBBY_SUCCEED',
	DISCONNECT_LOBBY: 'DISCONNECT_LOBBY',
	GET_TABLES: 'GET_TABLES',
	NEW_TABLE: 'NEW_TABLE',
	NEW_TABLE_SUCCEED: 'NEW_TABLE_SUCCEED',
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
}

export { Type, Action };
