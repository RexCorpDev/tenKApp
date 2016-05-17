'use strict';
const PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var morgan = require('morgan');
var path = require('path');
var server = require('http').Server(app);
var tenk = require('./tenk');
var io = require('socket.io')(server);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


io.on('connection', function(socket){
  console.log('Client Connected');

  tenk.initGame(io, socket);

});


server.listen(PORT, err => {
  console.log(err || `Server @ PORT ${PORT}`);
});
