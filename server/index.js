// app.js
// https://socket.io/docs/emit-cheatsheet/
const express = require('express');
const exphbs  = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const server = require('http').createServer(app);


const io = require('socket.io')(server);
const nsp = io.of('/lobby');

const EventEmitter = require('events');
const _ = require('lodash');
const Rx = require('rxjs/Rx');
const passport = require('./passport');


// Configure view engine to render
app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	extname: '.hbs',
}));
app.set('view engine', '.hbs');

app.use(cookieParser());

app.use(session({
  secret: 'forsalesecret',
  resave: true,
  saveUninitialized: true,
}));

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// Initialize Passport and restore authentication state,
// if any, from the session.
app.use(passport.initialize());
app.use(passport.session());



// Define routes.
app.get('/login/facebook',
	passport.authenticate('facebook'));

app.get('/login/twitter',
	passport.authenticate('twitter'));

app.get('/login/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', 
  	(err, user, info) => {
		if (err) {
  			return next(err);
  		}
  		if (!user) {
  			console.log(info);
  			res.json(info);
  		} else {
			res.render('login_success', user);
  		}
  	})(req, res, next)
});

app.get('/login/twitter/callback', (req, res, next) => {
  passport.authenticate('twitter', 
  	(err, user, info) => {
		if (err) {
  			return next(err);
  		}
  		if (!user) {
  			console.log(info);
  			res.json(info);
  		} else {
			res.render('login_success', user);
  		}
  	})(req, res, next)
});

app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

app.get('/user/:user_id', (req, res) => {
	User.findById(req.params.user_id)
		.then(user => {
			const keys = ['id', 'name', 'gender', 'avatar', 'custom_photo'];
			res.json(_.pick(user, keys));
		});
});


const User = require('./models/User.js');
const Table = require('./models/Table.js');
//const Chance = require('chance');

const user_id_list = [];

const lobby_emitter = new EventEmitter();


nsp.on('connect', socket => {
	lobby_emitter.emit('CONNECT_CLIENT', socket);
});


Rx.Observable
	.fromEvent(lobby_emitter, 'CONNECT_CLIENT')
	.switchMap(socket => {
		console.log(`socket connected: ${socket.id}`);
		registerSocket(socket);
		listenForSocket(socket);
		return Rx.Observable.of(socket);
	})
	.auditTime(500)
	.switchMap(socket => observeLobbyUpdate())
	.subscribe(results => {
		const data = {
			tables: results[0],
			users: results[1],
		};
		nsp.emit('UPDATE_LOBBY', data);
	});

Rx.Observable
	.fromEvent(lobby_emitter, 'DISCONNECT_CLIENT')
	.switchMap(socket => {
		console.log(`socket disconnected: ${socket.id}`);
		unregisterSocket(socket);
		return Rx.Observable.of(socket);
	})
	.switchMap(socket => {
		const {
			user_id,
		} = socket.handshake.query;
		
		// Should check if user force quit from table,
		// if so unregister the user and update the table first,
		// otherwise directly update the lobby
		const table_promise = Table.findOne({
			users: {
				'$in': [user_id]
			}
		});

		return Rx.Observable.fromPromise(table_promise)
			.switchMap(table => {
				if (table) {
					return observeRemoveUserFromTable(table._id, user_id);
				} else {
					return Rx.Observable.of({
						table: null,
						table_id: null,
					});
				}
			});
	})
	.switchMap(({table, table_id}) => {
		if (table && table_id) {
			const channel = getTableChannel(table_id);
			nsp.in(channel).emit('UPDATE_TABLE', table);
		}

		return observeLobbyUpdate();
	})
	.subscribe(results => {
		const data = {
			tables: results[0],
			users: results[1],
		};
		nsp.emit('UPDATE_LOBBY', data);
	});

Rx.Observable
	.fromEvent(lobby_emitter, 'JOIN_TABLE')
	.switchMap(({table_id, user_id, callback}) => {
		const promise = Table.updateAndPopulateOne({
			_id: table_id,
		}, {
			$push: {
				users: user_id,
			},
		});

		return Rx.Observable.fromPromise(promise)
			.map(table => {
				return {
					table,
					user_id,
					callback,
				}
			});
	})
	.switchMap(({table, user_id, callback}) => {
		const table_id = table._id;
		console.log(`user ${user_id} joined table: ${table_id}`);
		
		callback(table);
		
		const channel = getTableChannel(table_id);
		nsp.in(channel).emit('UPDATE_TABLE', table);

		const table_promise = Table.findAndPopulate();
		return Rx.Observable.fromPromise(table_promise);
	})
	.subscribe(tables => {
		const data = {
			tables,
		};
		nsp.emit('UPDATE_LOBBY', data);
	});


Rx.Observable
	.fromEvent(lobby_emitter, 'LEAVE_TABLE')
	.switchMap(({table_id, user_id, callback}) => {
		return observeRemoveUserFromTable(table_id, user_id)
			.map(({table, table_id, user_id}) => {
				return {
					table,
					table_id,
					user_id,
					callback,
				}
			});
	})
	.switchMap(({table, table_id, user_id, callback}) => {
		console.log(`User ${user_id} left table ${table_id}`);

		if (callback) {
			callback(table_id);
		}

		const channel = getTableChannel(table_id);
		nsp.in(channel).emit('UPDATE_TABLE', table);

		return observeLobbyUpdate();
	})
	.subscribe(results => {
		const data = {
			tables: results[0],
			users: results[1],
		};
		nsp.emit('UPDATE_LOBBY', data);
	});



const observeRemoveUserFromTable = (table_id, user_id) => {
	const table_promise = Table.findById(table_id);

	return Rx.Observable.fromPromise(table_promise)
		.switchMap(table => {
			const is_last_user = (table.users.length == 1 && table.users[0] == user_id);
			const next_owner = !is_last_user ? table.users[1] : null;

			const promise = is_last_user ? 
				Table.remove({ _id: table_id }) : 
				Table.updateAndPopulateOne({
					_id: table_id,
				}, {
					$pull: {
						users: user_id,
						players: user_id,
					},
					$set: {
						owner: next_owner,
					},
				});

			return Rx.Observable.fromPromise(promise);
		})
		.map(table => {
			return {
				table,
				table_id,
				user_id,
			}
		});
}

const observeLobbyUpdate = () => {
	const users_promise = User.findByIdList(user_id_list);
	const table_promise = Table.findAndPopulate();
	const all_promise = Promise.all([table_promise, users_promise]);
	return Rx.Observable.fromPromise(all_promise);
}

const getTableChannel = table_id => {
	return `table-${table_id}`;
}

const registerSocket = socket => {
	const {
		user_id,
	} = socket.handshake.query;

    // Add user id to users list if not exist
	if (!_.includes(user_id_list, user_id)) {
		user_id_list.push(user_id);
	}

	console.log(`connected user_id: ${user_id}`);
}

const unregisterSocket = socket => {
	const {
		user_id,
	} = socket.handshake.query;

	// Remove user id from users list
	_.pull(user_id_list, user_id);

	console.log(`disconnected user_id: ${user_id}`);
}

const listenForSocket = socket => {

	const {
		user_id,
	} = socket.handshake.query;

    socket.on('NEW_TABLE', (settings, callback) => {
    	// create a new table
    	const {
    		max_players,
    		name,
    	} = settings;

    	const table = new Table({
			max_players,
			name,
			owner: user_id,
			players: [user_id],
		});

    	table.save().then(table => {
    		const table_id = table._id;
    		console.log(`user ${table.owner} created a new table: ${table_id}`);

			const channel = getTableChannel(table_id);
			socket.join(channel, () => {
				lobby_emitter.emit('JOIN_TABLE', {
					table_id,
					user_id,
					callback,
				});
			});
    	});
	});

	socket.on('JOIN_TABLE', (table_id, callback) => {
		const channel = getTableChannel(table_id);
		socket.join(channel, () => {
			lobby_emitter.emit('JOIN_TABLE', {
				table_id,
				user_id,
				callback,
			});
		});
	});

	socket.on('LEAVE_TABLE', (table_id, callback) => {
		const channel = getTableChannel(table_id);
		socket.leave(channel, () => {
			lobby_emitter.emit('LEAVE_TABLE', {
				table_id,
				user_id,
				callback,
			});
		});
	});

    socket.on('disconnect', () => {
	    lobby_emitter.emit('DISCONNECT_CLIENT', socket);
	});
}


server.listen(4200);

console.log('SERVER START!');



const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/forsale');

const db = mongoose.connection;
db.on('error', (err) => {
	console.log('db connection error', err);
});
db.once('open', () => {
	console.log('db connection open.');
});


