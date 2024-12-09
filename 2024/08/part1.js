const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const grid = input.split("\r\n").map((line) => line.split(""));
const gridDuplicate = grid.map((line) => [...line]);
const gridMaxY = grid.length - 1;
const gridMaxX = grid[0].length - 1;
const pointsMap = new Map();
let totalAntiNodes = 0;

for (let y = 0; y < grid.length; y++) {
	for (let x = 0; x < grid[y].length; x++) {
		if (/[A-Za-z0-9]/.test(grid[y][x])) {
			if (pointsMap.has(grid[y][x]))
				pointsMap.set(grid[y][x], [...pointsMap.get(grid[y][x]), [y, x]]);
			else pointsMap.set(grid[y][x], [[y, x]]);
		}
	}
}

for (const [key, value] of pointsMap) {
	for (let first = 0; first < value.length - 1; first++) {
		for (let second = first + 1; second < value.length; second++) {
			const [y1, x1] = value[first];
			const [y2, x2] = value[second];
			const slopeY = y2 - y1;
			const slopeX = x2 - x1;

			if (checkBounds(y1 - slopeY, x1 - slopeX)) {
				gridDuplicate[y1 - slopeY][x1 - slopeX] = "#";
			}

			if (checkBounds(y2 + slopeY, x2 + slopeX)) {
				gridDuplicate[y2 + slopeY][x2 + slopeX] = "#";
			}
		}
	}
}

for (const line of gridDuplicate) {
	for (const char of line) {
		if (char === "#") totalAntiNodes++;
	}
}

console.log(pointsMap);
console.log(gridDuplicate.map((line) => line.join("")).join("\r\n"));
console.log("Total anti nodes: ", totalAntiNodes);

function checkBounds(y, x) {
	return y >= 0 && y <= gridMaxY && x >= 0 && x <= gridMaxX;
}
