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
            socket.broadcast.emit('tapped', msg);
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

app.get('/old/:color', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/old/' + req.params.color + '.html'));
});

app.get('/tap/:color', (req, res) => {
    haveWinner = true;
    console.log('>> ' + req.params.color);
    io.emit('tapped', req.params.color);
    res.send();
});

// start listening
http.listen(80);