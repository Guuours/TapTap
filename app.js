var express = require('express');
var path = require('path');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

// start listening
http.listen(5000);