const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const grid = input.split("\r\n").map((line) => line.split("").map((char) => parseInt(char)));
let score = 0;

for (let row = 0; row < grid.length; row++) {
	for (let col = 0; col < grid[row].length; col++) {
		if (grid[row][col] === 0) {
			const trail = searchTrail(row, col);
			score += trail.filter((num) => num === 9).length;
		}
	}
}

function checkBounds(row, col) {
	const rowMax = grid.length - 1;
	const colMax = grid[0].length - 1;

	return row >= 0 && row <= rowMax && col >= 0 && col <= colMax;
}

function searchTrail(row, col) {
	const current = grid[row][col];
	const trail = [current];

	if (checkBounds(row - 1, col))
		if (grid[row - 1][col] - 1 === current) trail.push(...searchTrail(row - 1, col));
	if (checkBounds(row, col - 1))
		if (grid[row][col - 1] - 1 === current) trail.push(...searchTrail(row, col - 1));
	if (checkBounds(row + 1, col))
		if (grid[row + 1][col] - 1 === current) trail.push(...searchTrail(row + 1, col));
	if (checkBounds(row, col + 1))
		if (grid[row][col + 1] - 1 === current) trail.push(...searchTrail(row, col + 1));

	return trail;
}

console.log("Total Trial Score: ", score);
