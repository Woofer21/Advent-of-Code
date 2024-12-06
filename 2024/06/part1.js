const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const grid = input.split("\n").map((line) => line.replace("\r", "").split(""));
const boundY = grid.length - 1;
const boundX = grid[0].length - 1;

console.log(grid);

let total = 1,
	posY = 0,
	posX = 0;

for (let pY = 0; pY <= boundY; pY++) {
	for (let pX = 0; pX <= boundX; pX++) {
		const currentTile = grid[pY][pX];

		if (currentTile === "^") {
			posY = pY;
			posX = pX;
		}
	}
}

while (posY + 1 <= boundY && posX + 1 <= boundX && posY - 1 >= 0 && posX - 1 >= 0) {
	const currentTile = grid[posY][posX];
	let nextTile = null;

	switch (currentTile) {
		case "^":
			nextTile = grid[posY - 1][posX];
			grid[posY][posX] = "X";

			if (nextTile === "#") {
				if (grid[posY][posX + 1] === ".") total++;
				grid[posY][posX + 1] = ">";
				posX++;
			} else {
				if (nextTile === ".") total++;
				grid[posY - 1][posX] = "^";
				posY--;
			}

			break;
		case ">":
			nextTile = grid[posY][posX + 1];
			grid[posY][posX] = "X";

			if (nextTile === "#") {
				if (grid[posY + 1][posX] === ".") total++;
				grid[posY + 1][posX] = "v";
				posY++;
			} else {
				if (nextTile === ".") total++;
				grid[posY][posX + 1] = ">";
				posX++;
			}

			break;
		case "v":
			nextTile = grid[posY + 1][posX];
			grid[posY][posX] = "X";

			if (nextTile === "#") {
				if (grid[posY][posX - 1] === ".") total++;
				grid[posY][posX - 1] = "<";
				posX--;
			} else {
				if (nextTile === ".") total++;
				grid[posY + 1][posX] = "v";
				posY++;
			}

			break;
		case "<":
			nextTile = grid[posY][posX - 1];
			grid[posY][posX] = "X";

			if (nextTile === "#") {
				if (grid[posY - 1][posX] === ".") total++;
				grid[posY - 1][posX] = "^";
				posY--;
			} else {
				if (nextTile === ".") total++;
				grid[posY][posX - 1] = "<";
				posX--;
			}

			break;
	}
}

console.log("Grid:\n", grid.map((line) => line.join("")).join("\n"));
console.log("Total: " + total);
