const express = require('express');

const res = require('express/lib/response');
const { Socket } = require('socket.io');
const app = express();
//const path = require('path');
const https = require('https');
const fs = require('fs');

// Parsing the form of body to take
// input from forms
const bodyParser = require("body-parser");

const { constants } = require('crypto')
// Configuring express to use body-parser
// as middle-ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/public', express.static(__dirname + '/public'));


app.get('/',function(req,res){
  //res.writeHead(200);
  res.sendFile(__dirname + '/public/index.html')
  
});

/*
set key and certificate options for browser
these are necessary since we are requesting users
for their geolocation, they are certificates of trustworthiness

*/
const options = {
  key: fs.readFileSync('daruk.cs.utep.edu.key'),
  cert: fs.readFileSync('daruk_cs_utep_edu_cert.cer')
};

const serv = https.createServer({secureOptions: constants.SSL_OP_NO_TLSv1 | constants.SSL_OP_NO_TLSv1_1, 
  key: fs.readFileSync('daruk.cs.utep.edu.key'),
  cert: fs.readFileSync('daruk_cs_utep_edu_cert.cer')
}, app);

const HOST = '129.108.156.19';
const PORT = 443;
serv.listen( PORT,HOST, function(){
  console.log("I'm listening at %s, on port %s", HOST, PORT);
} );
console.log('server started');

var SOCKET_LIST = {};

var zone1 = {};
var zone2 = {};
var zone3 = {};
var zone4 = {};
var zone5 = {};
var zone6 = {};
var zone7 = {};
var zone8 = {};
var zone9 = {};
var zone10 = {};

var ZONE_LIST = {
  zone1,zone2,zone3,zone4,zone5,
  zone6,zone7,zone8,zone9,zone10
};

var allZones = [
  [//zone 1
  [31.771011, -106.505353],[31.771572, -106.50448],
  [31.770759, -106.503883],[31.769936, -106.505235]
  ],
  [//zone 2
    [31.770927, -106.505332],[31.770871, -106.504741],
    [31.770959, -106.504715],[31.771294, -106.504811]
  ],
  [//zone 3
    [31.77084, -106.504699],[31.770802, -106.50464],
    [31.770587, -106.505225]
  ],
  [//zone 4
    [31.770465, -106.505247],[31.770530, -106.504931],
    [31.770342, -106.504719],[31.770162, -106.50518]
  ],
  [//zone 5
    [31.770883, -106.504641],[31.770732, -106.503878],
    [31.770481, -106.504262]
  ],
  [//zone 6
    [31.770982, -106.505153],[31.771264, -106.504611],
    [31.770737, -106.504089],[31.770392, -106.504567]
  ],
  [//zone 7
    [31.770957, -106.50495],[31.771119, -106.504621],
    [31.770771, -106.504239],[31.770562, -106.504508]
  ],
  [//zone 8
    [31.771290, -106.504835],[31.771269, -106.504464],
    [31.770887, -106.504642]
  ],
  [//zone 9
    [31.770863, -106.504678],[31.770931, -106.504596],
    [31.770857, -106.504508],[31.770803, -106.504609]
  ],
  [//zone 10
  /*[31.7833, -106.4989],[31.7810, -106.4979],[31.7833, -106.4959]*/
    [31.7810, -106.489],[31.7790, -106.4875],[31.7820, -106.4867]
  ]];


var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
  }
  //global unique ID
  const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
  //client ID gets assigned
  socket.id = guid();
  
  socket.coords = [0,0];
  
  SOCKET_LIST[socket.id]=socket;
  
  

  console.log('socket connection confirmed');
  
  socket.on('disconnect', function(){
    console.log('user disconnected ID:'+socket.id);
    delete zone1[socket.id];
    delete zone2[socket.id];
    delete zone3[socket.id];
    delete zone4[socket.id];
    delete zone5[socket.id];
    delete zone6[socket.id];
    delete zone7[socket.id];
    delete zone8[socket.id];
    delete zone9[socket.id];
    delete zone10[socket.id];
    delete SOCKET_LIST[socket.id];
  });

  socket.on('userCoords', function(data){
    socket.coords = [data.lat,data.lng]
    //console.log(socket.coords);
    for(var i in allZones){
  
      if(inside(socket.coords, allZones[i])=== true){
        if(i==0){
          zone1[socket.id]=1;
        }
        if(i==1){
          zone2[socket.id]=2;
        }
        if(i==2){
          zone3[socket.id]=3;
        }
        if(i==3){
          zone4[socket.id]=4;
        }  
        if(i==4){
          zone5[socket.id]=5;
        }
        if(i==5){
          zone6[socket.id]=6;
        }
        if(i==6){
          zone7[socket.id]=7;
        }
        if(i==7){
          zone8[socket.id]=8;
        }
        if(i==8){
          zone9[socket.id]=9;
        }
        if(i==9){
          zone10[socket.id]=10;
        }
        for(prop in ZONE_LIST){
          console.log(ZONE_LIST[prop]);
        }
      }
    }
  });
});
//console.log('so far so good');
var timer =0;

setInterval(function(){
  var pack = [];
  if(timer ==287){
    timer = 0;
  }
  timer +=1;
  for(var i in SOCKET_LIST){
    var socket = SOCKET_LIST[i];
    pack.push({
      timer,
      zones:[
        Object.keys(zone1).length,Object.keys(zone2).length,Object.keys(zone3).length,
        Object.keys(zone4).length,Object.keys(zone5).length,Object.keys(zone6).length,
        Object.keys(zone7).length,Object.keys(zone8).length,Object.keys(zone9).length,
        Object.keys(zone10).length],
      coord:socket.coords
    })
  }
  //emit to each client
  for(var i in SOCKET_LIST){
    var socket = SOCKET_LIST[i];
    socket.emit('newPos', pack);
  }
//new location every 5 secs
},1000);


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

