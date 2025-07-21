const canvas = document.getElementById("ttt_board");
const ctx = canvas.getContext("2d");
const status = document.getElementById("status");
const size = 3;
const cellSize = canvas.width / size;
let board = Array(size)
  .fill(null)
  .map(() => Array(size).fill(null));
let currentPlayer = "X";
let gameOver = false;

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;
  // Draw grid
  for (let i = 1; i < size; i++) {
    ctx.beginPath();
    ctx.moveTo(i * cellSize, 0);
    ctx.lineTo(i * cellSize, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i * cellSize);
    ctx.lineTo(canvas.width, i * cellSize);
    ctx.stroke();
  }

  // Draw X and O
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const x = col * cellSize;
      const y = row * cellSize;
      const val = board[row][col];
      if (val === "X") {
        ctx.beginPath();
        ctx.moveTo(x + 10, y + 10);
        ctx.lineTo(x + cellSize - 10, y + cellSize - 10);
        ctx.moveTo(x + cellSize - 10, y + 10);
        ctx.lineTo(x + 10, y + cellSize - 10);
        ctx.stroke();
      } else if (val === "O") {
        ctx.beginPath();
        ctx.arc(
          x + cellSize / 2,
          y + cellSize / 2,
          cellSize / 2 - 10,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }
    }
  }
}

function getWinner() {
  const lines = [];

  // Rows, columns
  for (let i = 0; i < size; i++) {
    lines.push(board[i]); // row
    lines.push(board.map((row) => row[i])); // column
  }

  // Diagonals
  lines.push(board.map((row, i) => row[i]));
  lines.push(board.map((row, i) => row[size - 1 - i]));

  for (const line of lines) {
    if (line.every((cell) => cell === "X")) return "X";
    if (line.every((cell) => cell === "O")) return "O";
  }

  if (board.flat().every((cell) => cell)) return "Draw";

  return null;
}

export function click_on_canvas(e) {
  // canvas.addEventListener("click", (e) => {
  if (gameOver) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const col = Math.floor(x / cellSize);
  const row = Math.floor(y / cellSize);

  if (!board[row][col]) {
    board[row][col] = currentPlayer;
    const winner = getWinner();
    if (winner) {
      gameOver = true;
      // status.textContent =
      //   winner === "Draw" ? "It's a draw!" : `Winner: ${winner}`;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      // status.textContent = `Turn: ${currentPlayer}`;
    }
    drawBoard();
  }
  // });
}

drawBoard();
