//https://www.javatpoint.com/expressjs-tutorial   express node.js
//https://www.youtube.com/watch?v=HkK5lGx9DRU&t=60s express node.js tutorial
//https://www.youtube.com/watch?v=VShtPwEkDD0 node.js tut

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
  
    
  
})

/* 
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const express = require('express');
const app = express();
app.listen(8000, () => console.log('listening at 8000'));
app.use(express.static('public'));
app.use(express.json());

temp_data = {}

app.post('/', (request, response) => {
    console.log(request.body);
    const data = request.body;
    const json_data = JSON.stringify(data);
    response.send(json_data);
    temp_data = json_data;
});

app.post('/audioPlayer.js', (request, response) => {
    response.send(temp_data);
});

 */


