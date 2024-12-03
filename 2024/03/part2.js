const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const matches = input.matchAll(
	/((?<multiplications>mul\((?<numbers>[\d]{1,3},[\d]{1,3})\))|(?<doOrNot>(don't)|(do)))/g
);

let total = 0;
let lastInstruction = "do";

for (const match of matches) {
	const numbersGroup = match.groups.numbers;
	const doOrNot = match.groups.doOrNot;

	if (doOrNot === "do") lastInstruction = "do";
	if (doOrNot === "don't") lastInstruction = "don't";

	if (lastInstruction === "do") {
		if (numbersGroup) {
			const numbers = numbersGroup.split(",").map((n) => parseInt(n));
			total += numbers[0] * numbers[1];
		}
	}

	console.log("Numbers: ", match.groups.multiplications, lastInstruction);
}

console.log("Total: ", total);
