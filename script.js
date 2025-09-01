//your JS code here. If required.
const submitBtn = document.getElementById("submit");
const playerForm = document.getElementById("playerForm");
const gameArea = document.getElementById("gameArea");
const board = document.getElementById("board");
const messageDiv = document.getElementById("message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "x";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // columns
  [0,4,8],[2,4,6]          // diagonals
];

// Start Game
submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value || "Player1";
  player2 = document.getElementById("player2").value || "Player2";

  playerForm.style.display = "none";
  gameArea.style.display = "block";

  // messageDiv.textContent = `${player1}, you're up`;
	messageDiv.textContent = `Player1, you're up`;
});

function handleCellClick(event){
	const cell = event.target;
	const index = cell.getAttribute("data-index");

	if(gameState[index] !== "" || !gameActive) return;

	gameState[index] = currentPlayer;
	cell.textContent = currentPlayer;
	cell.classList.add("taken");

	if(checkWin()){
		let winner = currentPlayer === "x" ? "Player1" : "Player2";
		messageDiv.textContent = `${winner} congratulations you won!`;
		gameState = false ;
		return;
	}

	if(!gameState.includes("")){
		messageDiv.textContent = "It's a Draw!";
		gameActive = false;
		return;
	}

	//switch turns
	currentPlayer = currentPlayer ==="x" ? "o" : "x";
	messageDiv.textContent = currentPlayer === "x" ? `Player1, you're up` : `Player2, you're up` ;//`${player1}, you're up` : `${player2}, your're up`;
}

// Check winning condition
function checkWin() {
  return winningCombinations.some(combination => {
    if (combination.every(index => cells[index].textContent === currentPlayer)) {
      // 🎨 Highlight winning cells in violet
      combination.forEach(index => {
        cells[index].style.backgroundColor = "violet";
      });
      return true; // winner found
    }
    return false;
  });
}


// Add click events to cells
    cells.forEach(cell => cell.addEventListener("click", handleCellClick));