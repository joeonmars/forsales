// app.js
const express = require('express');  
const app = express();  
const server = require('http').createServer(app);  

const io = require('socket.io')(server);


const Chance = require('chance');


// Create a game table
/*
const Table = require('./models/Table.js');
const table = new Table({
	max_players: 3,
	name: 'Test Table',
	owner_id: 'asdasd',
});
*/

const all_sockets = {};
const all_tables = {};



io.on('connect', socket => {  
    console.log('Client connected!', socket.id);
    all_sockets[socket.id] = socket;

    socket.on('GET_TABLES', (payload, callback) => {
    	console.log(`${socket.id} asked for tables.`, payload);
    	//socket.emit('LIST_TABLES', all_tables);
    	callback(all_tables);
	});

    socket.on('disconnect', () => {
    	console.log('Client disconnect!', socket.id);
		delete all_sockets[socket.id];
	});
});


server.listen(4200);

console.log('SERVER START!');
