const socket = io();

// const username = prompt("Enter your name:") || "Anonymous";
// socket.emit("set username", username);

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
