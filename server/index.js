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
const all_tables = {};

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
	.fromEvent(lobby_emitter, 'NEW_TABLE')
	.switchMap(table => {
		console.log(`user ${table.owner.id} created a new table`);
		all_tables[table.id] = table;
		return Rx.Observable.of(table);
	})
	.auditTime(500)
	.subscribe(table => {
		const data = {
			tables: _.values(all_tables),
		}
		nsp.emit('UPDATE_LOBBY', data);
	});

const observeLobbyUpdate = () => {
	const users_promise = User.findByIdList(user_id_list);
	const all_promise = Promise.all([_.values(all_tables), users_promise]);
	return Rx.Observable.fromPromise(all_promise);
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

    socket.on('NEW_TABLE', (payload, callback) => {
    	// create a new table
    	const {
    		max_players,
    		name,
    	} = payload;

    	const table = new Table({
			max_players,
			name,
			owner: user_id,
			users: [user_id],
			players: [user_id],
		});

		Table.populate(table, {
			path: 'owner users players',
			select: 'id name custom_photo avatar',
		}).then(t => {
			callback(t);
			lobby_emitter.emit('NEW_TABLE', t);
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


