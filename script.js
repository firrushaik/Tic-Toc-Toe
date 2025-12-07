const cells = document.querySelectorAll(".cell");
const userScore = document.getElementById("userScore");
const computerScore = document.getElementById("computerScore");
const drawScore = document.getElementById("drawScore");
const resetBtn = document.getElementById("resetBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
];

// USER MOVE (O)
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");

        if (board[index] !== "" || !gameActive) return;

        board[index] = "O";
        cell.textContent = "O";
        cell.classList.add("o");

        if (checkWinner("O")) {
            userScore.textContent = parseInt(userScore.textContent) + 1;
            gameActive = false;
            return;
        }

        if (board.every(cell => cell !== "")) {
            drawScore.textContent = parseInt(drawScore.textContent) + 1;
            gameActive = false;
            return;
        }

        setTimeout(computerMove, 300); 
    });
});

// COMPUTER MOVE (X)
function computerMove() {
    let emptyCells = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
    let random = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    board[random] = "X";
    cells[random].textContent = "X";
    cells[random].classList.add("x");

    if (checkWinner("X")) {
        computerScore.textContent = parseInt(computerScore.textContent) + 1;
        gameActive = false;
        return;
    }

    if (board.every(c => c !== "")) {
        drawScore.textContent = parseInt(drawScore.textContent) + 1;
        gameActive = false;
    }
}

// CHECK WINNER
function checkWinner(player) {
    return winningPatterns.some(pattern =>
        pattern.every(index => board[index] === player)
    );
}

// RESET GAME
resetBtn.addEventListener("click", () => {
    board = ["","","","","","","","",""];
    gameActive = true;

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("o", "x");
    });
});