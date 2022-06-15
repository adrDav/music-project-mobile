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
var CLIENT_LIST = {};
var ZONE_LIST = [0,0,0,0,0,1,1,1];



var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
  }
  //global unique ID
  const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
  //client ID gets assigned
  socket.id = guid();
  socket.zoneIn = [0,0,0,0,0,0,0,0];
  socket.coords = [0,0];
  SOCKET_LIST[socket.id]=socket;
  console.log('socket connection confirmed');
  
  socket.on('disconnect', function(){
    console.log('user disconnected ID:'+socket.id);
    delete SOCKET_LIST[socket.id];
  });

  socket.on('userCoords', function(data){
    socket.coords = [data.lat,data.lng]
    console.log(socket.coords);
    console.log(inside(socket.coords,verOfficeZone));
  });

});





setInterval(function(){
  var pack = [];

  for(var i in SOCKET_LIST){
    var socket = SOCKET_LIST[i];
    pack.push({
      zones:ZONE_LIST,
      coord:socket.coords
    })
  }


  //emit to each client
  for(var i in SOCKET_LIST){
    var socket = SOCKET_LIST[i];
    socket.emit('newPos', pack);
  }

//new location every 5 secs
},5000);


// function determines if coordinates are inside a polygon.
function inside(point, vs) {
  // ray-casting algorithm based on
  // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
  
  var x = point[0], y = point[1];
  
  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];
      
      var intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }
  
  return inside;

}

var verZoneOne = [
  [31.771011, -106.505353],[31.771572, -106.50448],
  [31.770785, -106.5033789],[31.769928, -106.505274]
];
var verZoneTwo = [
  [31.770973, -106.505293],[31.771267, -106.50482],
  [31.770883, -106.504641]
];
var verZoneThree = [
  [31.770973, -106.505293],[31.770883, -106.504641],
  [31.770587, -106.505225]
];
var verZoneFour = [
  [31.770465, -106.505247],[31.770530, -106.504931],
  [31.770342, -106.504719],[31.770162, -106.50518]
];
var verZoneFive = [
  [31.770883, -106.504641],[31.770732, -106.503878],
  [31.770481, -106.504262]
  //[zone_five.get_fourth_lat, zone_five.get_fourth_lng]
];
var verZoneSix = [
  [31.770982, -106.505153],[31.771264, -106.504611],
  [31.770737, -106.504089],[31.770392, -106.504567]
];
var verZoneSeven = [
  [31.770957, -106.50495],[31.771119, -106.504621],
  [31.770771, -106.504239],[31.770562, -106.504508]
];
var verZoneEight = [
  [31.771290, -106.504835],[31.771269, -106.504464],
  [31.770887, -106.504642]
  //[zone_eight.get_fourth_lat, zone_eight.get_fourth_lng]
];
var verZoneNine = [
  [31.770863, -106.504678],[31.770931, -106.504596],
  [31.770857, -106.504508],[31.770803, -106.504609]
];
var verOfficeZone = [
  [31.7810, -106.489],[31.7790, -106.4875],
  [31.7820, -106.4867]
];