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
  /*cell format:
    [Latitude, Longitude]
   */
  [//zone 1
  [31.771011, -106.505353],[31.771572, -106.50448],
  [31.770759, -106.503883],[31.769936, -106.505235]
  ],
  [//zone 2
    [31.770927, -106.505332],[31.770871, -106.504741],
    [31.770959, -106.504715],[31.771294, -106.504811]
  ],
  [//zone 3
    [31.770952095507827, -106.50533270745576],
    [31.7712966318469, -106.50486592165555],
    [31.77059063640197, -106.50525038709141],
    [31.770999131185643, -106.50466124933202]
  ],
  [//zone 4 
    [31.770440219135413, -106.50513534661593],
    [31.770344085033056, -106.50519419973243],
    [31.770273965132453, -106.50511239235747],
    [31.77024889120265, -106.50495435309028],
    [31.770332536566887, -106.50483260239771],
    [31.770431605766305, -106.50488303921163],
    [31.77045840380784, -106.50501424296718]
  ],
  [//zone 5
    [31.770804143347682, -106.50459993234882],[31.77085663129734, -106.50453729954998],
    [31.770734861317155, -106.50390501617906], [31.770518248473184, -106.50425020629088] 
  ],
  [//zone 6 
    [31.770913565788177, -106.50499934708768],
    [31.771134915954114, -106.50485164139434],
    [31.77112702194971, -106.50452753866334],
    [31.77095899734077, -106.50427235809532],
    [31.77070536122531, -106.50425488176975],
    [31.770569345585926, -106.5044561835144],
    [31.770618727560084, -106.5047563898584]
  ],
  [//zone 7
    [31.77105839022311, -106.50479359266403],
    [31.771062793502256, -106.50458589262486],
    [31.77095937709651, -106.50440354275737],
    [31.77081058701421, -106.50435123968158],
    [31.770690431880027, -106.50440867692586],
    [31.770656518889222, -106.50457633600689],
    [31.77076958497545, -106.50479041287583],
    [31.770920846938743, -106.50486450613802]
  ],
  [//zone 8
    [31.771290, -106.504835],
    [31.771269, -106.504464],
    [31.770952438176185, -106.50465697972291],
    [31.77094876434593,-106.50460686296005]
  ],
  [//zone 9
    [31.770672241737987, -106.50483465653441],
    [31.770590124247278, -106.50467818677983],
    [31.770420390546903, -106.50486808469745],
    [31.770458262161554, -106.50495449235406]
  ],
  [//zone 10
      [31.770889902406374,-106.50469240132244],
      [31.770925112231943,-106.50461522326934],
      [31.770854208584378,-106.50451735266788],
      [31.770810415528928,-106.50461456555729]
    //[31.7833, -106.4989],[31.7810, -106.4979],[31.7833, -106.4959],[31.78250246414785, -106.49582016252616],[31.781814005929437, -106.49642477457539],[31.78398008857582, -106.49745715946028]
    //[31.7810, -106.489],[31.7790, -106.4875],[31.7820, -106.4867]
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
        /*for(prop in ZONE_LIST){
          console.log(ZONE_LIST[prop]);
        }*/
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
        Object.keys(zone10).length]
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

