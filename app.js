//https://www.javatpoint.com/expressjs-tutorial   express node.js
//https://www.youtube.com/watch?v=HkK5lGx9DRU&t=60s express node.js tutorial
//https://www.youtube.com/watch?v=VShtPwEkDD0 node.js tut

const res = require('express/lib/response');
const http = require('http');
const app = require('express')();
const fs = require('fs');//is this necessary ?
const { stringify } = require('querystring');
app.get("/", (req,res)=> res.sendFile(__dirname + "/index.html"))

app.listen(9091, ()=>console.log("Listening on http port 9091"))
const websocketServer = require("websocket").server
const httpServer = http.createServer();
httpServer.listen(9090, () => console.log("Listening.. on 9090"))




//hashmap clients, and object becomes a hashmap
var clients = {}; 
var zone1 = {};
var zone2 = {};
var zone3 = {};
var zone4 = {};

const wsServer = new websocketServer({
    "httpServer": httpServer
})

wsServer.on("request", request => {
  const connection = request.accept(null, request.origin);
  connection.on("open", () => console.log("opened!"))
  connection.on("close", () => { 
    console.log("closed!")
  })
  connection.on("message", message => {
  
    const result = JSON.parse(message.utf8Data)
    
    if(result.method === "join"){
      const clientID = result.clientID;
      clients[clientID]  = 1;
      
      console.log("A user has joined with the ClientID   ");
      console.log(JSON.stringify(clientID))
    }

    if(result.method === "close"){
      const clientID = result.clientID;
      delete clients[clientID];
      delete zone1[clientID];
      delete zone2[clientID];
      delete zone3[clientID];
      
    }
    
    if(result.method === "inZone1"){
      clientID = result.clientID;
      zone1[clientID] = 1;
      //clientID.send(stringify())
      // send value to be added to the low and high selfs  
    }
    if(result.method === "notInZone1"){
      const clientID = result.clientID;
      delete zone1[clientID];
    }


    if(result.method === "inZone2"){
      clientID = result.clientID;
      zone2[clientID] = 2;
      
    }
    if(result.method === "notInZone2"){
      const clientID = result.clientID;
      delete zone2[clientID];
    }

    if(result.method === "inZone3"){
      clientID = result.clientID;
      zone3[clientID] = 3;
    }

    if(result.method === "notInZone3"){
      const clientID = result.clientID;
      delete zone2[clientID];
    }
    /*
    function updateSystem(){
      clients.clientID.forEach(c => {})
    }*/

    console.log("count of users in server : ");
    var keys = Object.keys(clients);
    keys.forEach(key=>{
      console.log(key + '|' + clients[key]);
    });

    console.log("users in zone 1 :");
    var keys = Object.keys(zone1);
    keys.forEach(key=>{
      console.log(key + '|' + zone1[key]);
    });

    console.log("users in zone 2 :");
    var keys = Object.keys(zone2);
    keys.forEach(key=>{
      console.log(key + '|' + zone2[key]);
    });

})
})
