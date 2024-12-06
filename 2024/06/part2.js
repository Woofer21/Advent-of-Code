const fs = require("fs");

const start = new Date().getTime();

const input = fs.readFileSync("input.txt", "utf8");

let grid = input.split("\n").map((line) => line.replace("\r", "").split(""));
const boundY = grid.length - 1;
const boundX = grid[0].length - 1;

// console.log(grid);

let total = 1,
	posY = 0,
	posX = 0,
	startY = 0,
	startX = 0;

for (let pY = 0; pY <= boundY; pY++) {
	for (let pX = 0; pX <= boundX; pX++) {
		const currentTile = grid[pY][pX];

		if (currentTile === "^") {
			posY = pY;
			startY = pY;

			posX = pX;
			startX = pX;
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
				grid[posY][posX + 1] = ">";
				posX++;
			} else {
				grid[posY - 1][posX] = "^";
				posY--;
			}

			break;
		case ">":
			nextTile = grid[posY][posX + 1];
			grid[posY][posX] = "X";

			if (nextTile === "#") {
				grid[posY + 1][posX] = "v";
				posY++;
			} else {
				grid[posY][posX + 1] = ">";
				posX++;
			}

			break;
		case "v":
			nextTile = grid[posY + 1][posX];
			grid[posY][posX] = "X";

			if (nextTile === "#") {
				grid[posY][posX - 1] = "<";
				posX--;
			} else {
				grid[posY + 1][posX] = "v";
				posY++;
			}

			break;
		case "<":
			nextTile = grid[posY][posX - 1];
			grid[posY][posX] = "X";

			if (nextTile === "#") {
				grid[posY - 1][posX] = "^";
				posY--;
			} else {
				grid[posY][posX - 1] = "<";
				posX--;
			}

			break;
	}
}

for (let pY = 0; pY <= boundY; pY++) {
	for (let pX = 0; pX <= boundX; pX++) {
		if (pX === startX && pY === startY) continue;

		const currentTile = grid[pY][pX];
		grid = grid.map((line) =>
			line.map((char) => {
				if (char === "^" || char === ">" || char === "<" || char === "v") return ".";
				return char;
			})
		);

		if (currentTile === "X") {
			let altGrid = grid.map((line) => [...line]);
			altGrid = altGrid.map((line) => line.map((char) => (char === "X" ? "." : char)));

			altGrid[pY][pX] = "#";
			altGrid[startY][startX] = "^";

			let t = checkPermutation(altGrid);
			if (t === -1) total++;
		}
	}
}

console.log("Total Permutations: " + total);
console.log("Time: " + (new Date().getTime() - start) / 1000);

function checkPermutation(grid) {
	let posX = startX;
	let posY = startY;
	let total = 1,
		runs = 0;

	while (posY + 1 <= boundY && posX + 1 <= boundX && posY - 1 >= 0 && posX - 1 >= 0) {
		if (runs > grid.length * grid[0].length) return -1;
		runs++;
		const currentTile = grid[posY][posX];
		let nextTile = null;

		switch (currentTile) {
			case "^":
				nextTile = grid[posY - 1][posX];
				grid[posY][posX] = "X";

				if (nextTile === "#") {
					if (grid[posY][posX + 1] === ".") total++;

					if (grid[posY][posX + 1] === "#") {
						grid[posY + 1][posX] = "v";
						posY++;
					} else {
						grid[posY][posX + 1] = ">";
						posX++;
					}
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

					if (grid[posY + 1][posX] === "#") {
						grid[posY][posX - 1] = "<";
						posX--;
					} else {
						grid[posY + 1][posX] = "v";
						posY++;
					}
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

					if (grid[posY][posX - 1] === "#") {
						grid[posY - 1][posX] = "^";
						posY--;
					} else {
						grid[posY][posX - 1] = "<";
						posX--;
					}
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

					if (grid[posY - 1][posX] === "#") {
						grid[posY][posX + 1] = ">";
						posX++;
					} else {
						grid[posY - 1][posX] = "^";
						posY--;
					}
				} else {
					if (nextTile === ".") total++;
					grid[posY][posX - 1] = "<";
					posX--;
				}

				break;
		}
	}

	return total;
}
