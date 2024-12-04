const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const grid = input.split("\n").map((line) => line.replace("\r", "").split(""));

function checkTile(grid, row, col, movement, char) {
	const moveX = movement[0];
	const moveY = movement[1];
	const maxRow = grid.length;
	const maxCol = grid[0].length;

	const currentX = row + moveX;
	const currentY = col + moveY;

	if (currentX < 0 || currentX >= maxRow || currentY < 0 || currentY >= maxCol) return false;

	if (grid[currentX][currentY] !== char) return false;

	return true;
}

function searchWord(grid) {
	const movement = Object.freeze({
		NW: [-1, 1],
		NE: [1, 1],
		SW: [-1, -1],
		SE: [1, -1],
	});
	let maxRow = grid.length;
	let maxCol = grid[0].length;
	let answer = [];

	for (let row = 0; row < maxRow; row++) {
		for (let col = 0; col < maxCol; col++) {
			if (grid[row][col] !== "A") continue;

			if (
				checkTile(grid, row, col, movement.NW, "M") &&
				checkTile(grid, row, col, movement.SE, "S") &&
				checkTile(grid, row, col, movement.NE, "M") &&
				checkTile(grid, row, col, movement.SW, "S")
			)
				answer.push([row, col]);
			if (
				checkTile(grid, row, col, movement.NW, "M") &&
				checkTile(grid, row, col, movement.SE, "S") &&
				checkTile(grid, row, col, movement.NE, "S") &&
				checkTile(grid, row, col, movement.SW, "M")
			)
				answer.push([row, col]);
			if (
				checkTile(grid, row, col, movement.NW, "S") &&
				checkTile(grid, row, col, movement.SE, "M") &&
				checkTile(grid, row, col, movement.NE, "M") &&
				checkTile(grid, row, col, movement.SW, "S")
			)
				answer.push([row, col]);
			if (
				checkTile(grid, row, col, movement.NW, "S") &&
				checkTile(grid, row, col, movement.SE, "M") &&
				checkTile(grid, row, col, movement.NE, "S") &&
				checkTile(grid, row, col, movement.SW, "M")
			)
				answer.push([row, col]);
		}
	}

	return answer;
}

const result = searchWord(grid);
console.log("Result Grid: ", result);
console.log("Result Count: ", result.length);
