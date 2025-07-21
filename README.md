## Project Structure

```
public/
├── index.html          # Main UI
├── style.css           # Styling
├── client.js           # Handles socket events and DOM updates
├── tic_tac_toe_app.js  # Canvas drawing and game logic
server.js               # Express + Socket.IO backend
```

---

## 💻 How to Run Locally

### 1. Install dependencies

```bash
npm init
npm install express socket.io
```

### 2. Start the server

```bash
node server.js
```

### 3. Open the app

Visit [http://localhost:3000](http://localhost:3000) in two browser tabs.

---

## 👨‍💻 How It Works

- **Client-side**:

  - Prompts for a username
  - Renders connected users in the lobby
  - Players click the "Basket" button to join the queue
  - Canvas click events are sent to the server
  - Server confirms if it's the player's turn, then broadcasts the move

- **Server-side**:
  - Tracks connected users and queue
  - Enforces turn logic (`x_or_y` toggling)
  - Cleans up players on disconnect
