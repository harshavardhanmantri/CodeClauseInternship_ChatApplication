const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const cors = require("cors");
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log(`server connted to socket ${socket.id}`);
  socket.on("send_message", (message, room) => {
    if (room === "") {
      socket.broadcast.emit("recieve_message", message);
    } else {
      socket.to(room).emit("recieve_message", message);
    }
  });
  socket.on("join_room", (room, cb) => {
    console.log(room);
    socket.join(room);
    cb(`joined the room ${room}`);
  });
});
server.listen(3003, () => {
  console.log("server started");
});
