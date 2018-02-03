// app.js
const express = require('express');  
const app = express();  
const server = require('http').createServer(app);  
const io = require('socket.io')(server);

server.listen(4200);

console.log("SERVER START!");