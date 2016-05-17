'use strict';


var io = require('socket.io');

exports.initGame = (io, socket) => {

 socket.on('hello', data => {
   console.log('DATA\n',data);
 })

}
