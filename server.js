const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const users = { 1234: "gaga", 5678: "juda", 2468: "zaza" };

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  socket.on("set username", (username) => {
    users[socket.id] = username;
    io.emit("server message", `${username} joined`);
    // io.emit("add_user", username, socket.id);
    io.emit("all_players", users);
    console.log(`User set: ${username} (${socket.id})`);
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log(`User ${users[socket.id]} (${socket.id}) disconnected`);
    delete users[socket.id];
    io.emit("remove_user", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
