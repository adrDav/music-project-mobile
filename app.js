//https://www.javatpoint.com/expressjs-tutorial   express node.js
//https://www.youtube.com/watch?v=HkK5lGx9DRU&t=60s express node.js tutorial
//https://www.youtube.com/watch?v=VShtPwEkDD0 node.js tut

const res = require('express/lib/response');
const http = require('http');
const app = require('express')();

app.get("/", (req,res)=> res.sendFile(__dirname + "/index.html"))

app.listen(9091, ()=>console.log("Listening on http port 9091"))
const websocketServer = require("websocket").server
const httpServer = http.createServer();
httpServer.listen(9090, () => console.log("Listening.. on 9090"))
//hashmap clients, and object becomes a hashmap
const clients = {}; 
const zones = {};

const wsServer = new websocketServer({
    "httpServer": httpServer
})

wsServer.on("request", request => {
  const connection = request.accept(null, request.origin);
  connection.on("open", () => console.log("opened!"))
  connection.on("close", () => console.log("closed!"))
  connection.on("message", message => {
  
    const result = JSON.parse(message.utf8Data)
    
    if(result.method === "join"){
      const clientID = result.clientID;
      
      console.log("A user has joined with the ClientID   ");
      console.log(JSON.stringify(clientID))
    }
    
  
  
})
function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}

const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();

})
