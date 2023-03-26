const X_CLASS = "x";
const O_CLASS = "o";
let xTurn;
const WINNING_COMBINATIONS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

const boxes = document.querySelectorAll("[data-box]");
const board = document.getElementById("board");
const winningMessage = document.getElementById("winningMessage");
const winningMessageText = document.querySelector(
	"[data-winning-message-text]"
);
const restartButton = document.getElementById("restartButton");

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
	xTurn = true;

	winningMessage.classList.remove("show");
	winningMessageText.innerText = "";
	boxes.forEach((box) => {
		box.classList.remove(X_CLASS);
		box.classList.remove(O_CLASS);
	});

	boxes.forEach((box) => box.removeEventListener("click", handleEvent));
	boxes.forEach((box) =>
		box.addEventListener("click", handleEvent, { once: true })
	);

	setHoverState();
}

function handleEvent(e) {
	const box = e.target;
	const currentClass = xTurn ? X_CLASS : O_CLASS;

	placeMark(box, currentClass);

	if (checkWin(currentClass)) {
		winningMessageText.innerText = `${xTurn ? "X" : "O"} Wins!`;
		winningMessage.classList.add("show");
	} else if (checkDraw()) {
		winningMessageText.innerText = "Draw!";
		winningMessage.classList.add("show");
	} else {
		swapTurns();
		setHoverState();
	}
}

function placeMark(box, currentClass) {
	box.classList.add(currentClass);
}

function checkWin(currentClass) {
	return WINNING_COMBINATIONS.some((combination) => {
		return combination.every((index) => {
			return boxes[index].classList.contains(currentClass);
		});
	});
}

function checkDraw() {
	return [...boxes].every(
		(box) => box.classList.contains(X_CLASS) || box.classList.contains(O_CLASS)
	);
}

function swapTurns() {
	xTurn = !xTurn;
}

function setHoverState() {
	board.classList.remove(X_CLASS);
	board.classList.remove(O_CLASS);
	if (xTurn) board.classList.add(X_CLASS);
	else board.classList.add(O_CLASS);
}
