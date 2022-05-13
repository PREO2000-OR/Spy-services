var express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let messages = []
io.on('connection', (socket) => {
  console.log('a user connected'),
  console.log(socket.id);;
  socket.on("chat message", (msg) => {
    console.log(msg);
    messages.push(msg)
    io.emit('messages', { messages, id: socket.id });
  })
});


httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});