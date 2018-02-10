// app.js
const express = require('express');
const exphbs  = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const server = require('http').createServer(app);

const io = require('socket.io')(server);
const nsp = io.of('/lobby');

const _ = require('lodash');
const passport = require('./passport');

const User = require('./models/User.js');


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


const Table = require('./models/Table.js');
//const Chance = require('chance');

const all_sockets = {};
const all_tables = {};



nsp.on('connect', socket => {  


    console.log('Client connected!', socket.id);
    all_sockets[socket.id] = socket;



    socket.on('GET_TABLES', (payload, callback) => {
    	console.log(`${socket.id} asked for tables.`);
    	callback(all_tables);
	});



    socket.on('NEW_TABLE', (payload, callback) => {
    	console.log(`${socket.id} creates a new table.`);

    	// create a new table
    	const {
    		max_players,
    		name,
    	} = payload;

    	const new_table = new Table({
			max_players,
			name,
			owner_id: socket.id,
		});

    	all_tables[new_table.id] = new_table;

    	callback(new_table);
	});


    socket.on('disconnect', () => {
    	console.log('Client disconnect!', socket.id);
		delete all_sockets[socket.id];
	});
});


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


