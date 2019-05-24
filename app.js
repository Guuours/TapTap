var express = require('express');
var path = require('path');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var haveWinner = false;
io.on('connection', socket => {
    socket.on('tap', msg => {
        if (!haveWinner) {
            haveWinner = true;
            console.log('>> ' + msg);
            socket.broadcast.emit("tapped", msg);
        }
    });
    socket.on('reset', msg => {
        console.log('>> reset');
        haveWinner = false;
    });
});

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

app.get('/:color', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/' + req.params.color + '.html'));
});

// start listening
http.listen(5000);