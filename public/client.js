// import { response } from "express";
import { click_on_canvas } from "./tic_tac_toe_app.js";

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

const basketbtn = document.getElementById("basket");

basketbtn.addEventListener("click", () => {
  socket.emit("put_basket");
});

socket.on("put_basket", function (response) {
  const player_li = document.querySelector(
    `li[data-userid="${response["id"]}"]`
  );
  if (response["status"] === true) {
    player_li.style.color = "green";
  }
});

socket.on("add_user", function (username, socket_id) {
  add_player(username, socket_id);
});

socket.on("remove_user", function (socket_id) {
  remove_player(socket_id);
});

socket.on("all_players", function (players) {
  show_all_players(players);
});

const canvas = document.getElementById("ttt_board");
canvas.addEventListener("click", (e) => {
  socket.emit("player_turn", "", (response) => {
    if (response === true) {
      console.log("Player's turn confirmed");
      click_on_canvas(e);
    }
  });
  // click_on_canvas(e);
});
