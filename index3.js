var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(3003);

console.log('Server is running ');

app.get('/', function(req, res) {
  
  res.send({
    test: 'hi'
  });
  
});

io.sockets.on('connection', function (socket) {
	socket.on('eventServer', function (data) {
		console.log(data);
		socket.emit('eventClient', { data: 'Hello Client' });
	});
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
});