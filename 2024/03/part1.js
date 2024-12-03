const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const matches = input.matchAll(/(?<multiplications>mul\((?<numbers>[\d]{1,3},[\d]{1,3})\))/g);

let total = 0;

for (const match of matches) {
	const numbers = match.groups.numbers.split(",").map((n) => parseInt(n));

	total += numbers[0] * numbers[1];

	console.log("Numbers: ", match.groups.multiplications, numbers);
}

console.log("Total: ", total);
