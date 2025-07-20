function show_all_players(players_obj) {
  const playerList = document.getElementById("players-list");
  playerList.innerHTML = "";
  Object.entries(players_obj).forEach(([id, name]) => {
    const item = document.createElement("li");
    item.dataset.userid = id;
    item.textContent = name;
    playerList.appendChild(item);
  });
}

// function add_player(player, playerid) {
//   const playerList = document.getElementById("players-list");
//   const item = document.createElement("li");
//   item.dataset.userid = playerid;
//   item.textContent = player;
//   playerList.appendChild(item);
// }

function remove_player(userid) {
  const li = document.querySelector(`li[data-userid="${userid}"]`);
  if (li && li.parentElement) {
    li.parentElement.removeChild(li);
  }
}

const socket = io();

const username = prompt("Enter your name:") || "Anonymous";
socket.emit("set username", username);

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", function ({ user, msg }) {
  const item = document.createElement("li");
  item.innerHTML = `<strong>${user}:</strong> ${msg}`;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});

socket.on("server message", function (msg) {
  const item = document.createElement("li");
  item.className = "server-message";
  item.textContent = msg;
  messages.appendChild(item);
});

socket.on("add_user", function (username, socket_id) {
  add_player(username, socket_id);
});

socket.on("remove_user", function (socket_id) {
  remove_player(socket_id);
});

socket.on("all_players", function (players) {
  // const players_list = Object.values(players);
  show_all_players(players);
});
