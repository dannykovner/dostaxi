var express = require('express');
const https = require('https');
var bodyParser = require('body-parser');
var router = require('./api');
var app = express();
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var User = require('./modules/User');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

module.exports = io;

var port = process.env.PORT || 3000;
let body = "";

// Connection URL
var url = 'mongodb://localhost:27017/DOStaxi';

// Running the server
server.listen(port, function(){
    console.log('listening to port %d', port);
});

app.use(router);

// Handeling error Middlewar
app.use(function(err,req,res,next){
    console.log(err.message);
});

// Socket.io functions
io.on('connection', function(socket){
    console.log('user connected');

    socket.on('location', function(data){
        console.log(data)
    });

    socket.on('JSON', function(data){
        //console.log(JSON.parse(data));
        socket.broadcast.emit(data)
    })
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});