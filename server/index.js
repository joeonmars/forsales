// app.js
const express = require('express');  
const app = express();  
const server = require('http').createServer(app);  

const io = require('socket.io')(server);
const nsp = io.of('/lobby');

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



