const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const users = {};
let waiting_list = [];

function check_player_turn(id) {
  const exists = waiting_list.slice(0, 2).some((player) => player.id === id);
  if (exists) {
    return true;
  }
  return false;
}

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  socket.on("set username", (username) => {
    users[socket.id] = username;
    io.emit("server message", `${username} joined`);
    // io.emit("add_user", username, socket.id);
    io.emit("all_players", users);
    console.log(`User set: ${username} (${socket.id})`);
  });

  socket.on("put_basket", () => {
    const exists = waiting_list.some((player) => player.id === socket.id);
    if (!exists) {
      waiting_list.push({ id: socket.id, name: users[socket.id] });
      io.emit("put_basket", { status: false, id: socket.id });
    }
    io.emit("put_basket", { status: true, id: socket.id });
    console.log(waiting_list);
  });

  socket.on("player_turn", (_, callback) => {
    const is_his_turn = check_player_turn(socket.id);
    console.log(`Player turn checked for ${socket.id}: ${is_his_turn}`);
    callback(is_his_turn);
  });

  socket.on("disconnect", () => {
    console.log(`User ${users[socket.id]} (${socket.id}) disconnected`);
    delete users[socket.id];
    // delete from waitinglist
    const index = waiting_list.findIndex((player) => player.id === socket.id);
    if (index !== -1) {
      waiting_list.splice(index, 1);
    }
    io.emit("remove_user", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
