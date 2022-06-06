const express = require('express');
const res = require('express/lib/response');
const { Socket } = require('socket.io');
const app = express();
const serv = require('http').Server(app);

app.get('/',function(req,res){
  res.sendFile(__dirname + '/client/index.html');
  
});

app.use('/client', express.static(__dirname + '/client'));

serv.listen(2000);
console.log('server started');

var SOCKET_LIST = {};

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
  }
  //global unique ID
  const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
  //let clientId =  guid();

  socket.id = guid();
  socket.lat = 0;
  socket.lng = 0;
  SOCKET_LIST[socket.id]=socket;
  console.log('socket connection confirmed');
  
  socket.on('disconnect', function(){
    console.log('user disconnected ID:'+socket.id);
    delete SOCKET_LIST[socket.id];
  });
  
  //debuggin send and receive data between client and server
  socket.on('happy', function(data){
    console.log('we are happy: ' + data.object);
  });

  socket.emit('serverMsg', {
    msg:'this is a msg/object from the server'
  });

});

setInterval(function(){
  var pack = [];
  for(var i in SOCKET_LIST){
    var socket = SOCKET_LIST[i];
    socket.lat++;
    socket.lng++;
    pack.push({
      lan:socket.lan,
      lng:socket.lng,
      //not important 
      id:socket.id
    })
  }

  for(var i in SOCKET_LIST){
    var socket = SOCKET_LIST[i];
    socket.emit('newPos', pack);
  }


},100/25);