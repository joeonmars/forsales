// app.js
const express = require('express');  
const app = express();  
const server = require('http').createServer(app);  

const io = require('socket.io')(server);
const all_sockets = [];

io.on('connect', socket => {  
    console.log('Client connected!', socket.id);
    all_sockets.push(socket);

    socket.emit('server:connected', 'hello');

    socket.on('disconnect', () => {
    	console.log('Client disconnect!', socket.id);
		const i = all_sockets.indexOf(socket);
		all_sockets.splice(i, 1);
	});
});


server.listen(4200);

console.log('SERVER START!');
