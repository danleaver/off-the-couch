const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
// const fs = require('fs');

// const options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

// app.use(express.static("../socket-io-client/build"));

// const server = http.createServer(options, app)
const server = http.createServer(app)


const io = socketIo(server); 

let clients = 0
io.on("connection", (socket) => {
  clients++
  console.log(clients + "clients connected");
  socket.emit('newclientconnect', {description: "hey, welcome!"})
  socket.broadcast.emit('newclientconnect', {description: "someone new has joined!"})

  socket.on('stream', data =>{
    socket.broadcast.emit('stream', data)
  })

  socket.on('message', data => {
    console.log(data)
    socket.broadcast.emit('message', data)
  })

  socket.on("disconnect", () => {
    clients--
    console.log("client disconnected.." + clients + "clients remainining");
    socket.broadcast.emit('newclientconnect', {description: "someone has disconnected!"})
  });

});

server.listen(port, () => console.log(`Listening on port ${port}`));