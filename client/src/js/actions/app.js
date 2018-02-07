const Type = {
	PING: 'PING',
	PONG: 'PONG',
	CONNECT_LOBBY: 'CONNECT_LOBBY',
	CONNECT_LOBBY_SUCCEED: 'CONNECT_LOBBY_SUCCEED',
	LIST_TABLES: 'LIST_TABLES',
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

	listTables: () => {
		return {
			type: Type.LIST_TABLES,
		}
	},
}

export { Type, Action };
