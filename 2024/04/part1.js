const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const grid = input.split("\n").map((line) => line.replace("\r", "").split(""));
const word = "XMAS";

function searchGrid(grid, row, col, move) {
	const moveX = move[0];
	const moveY = move[1];
	const wordLength = word.length;
	const maxRow = grid.length;
	const maxCol = grid[0].length;

	let currentX = row + moveX;
	let currentY = col + moveY;
	let char = 1;

	for (char = 1; char < wordLength; char++) {
		// Out of Bounds Break
		if (currentX < 0 || currentX >= maxRow || currentY < 0 || currentY >= maxCol) break;

		if (grid[currentX][currentY] !== word[char]) break;

		currentX += moveX;
		currentY += moveY;
	}

	if (char === wordLength) return true;

	return false;
}

function searchWord(grid) {
	const moveX = [-1, -1, 0, 1, 1, 1, 0, -1];
	const moveY = [0, 1, 1, 1, 0, -1, -1, -1];
	const maxRow = grid.length;
	const maxCol = grid[0].length;
	let answer = [];

	for (let row = 0; row < maxRow; row++) {
		for (let col = 0; col < maxCol; col++) {
			if (grid[row][col] !== word[0]) continue;

			for (let dir = 0; dir < 8; dir++) {
				if (searchGrid(grid, row, col, [moveX[dir], moveY[dir]])) answer.push([row, col]);
			}
		}
	}

	return answer;
}

const result = searchWord(grid);
console.log("Result Grid: ", result);
console.log("Result Count: ", result.length);
