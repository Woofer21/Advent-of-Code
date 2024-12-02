const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const reports = input.split("\n");
let safe = 0;

for (const levels of reports) {
	const level = levels.split(" ");
	let levelsSafe = 0;
	let dir = "";

	for (let i = 0; i < level.length - 1; i++) {
		const current = parseInt(level[i]);
		const next = parseInt(level[i + 1]);

		if (current < next) {
			if (i === 0) dir = "incr";
			else if (dir === "decr") break;

			if (next - current >= 1 && next - current <= 3) levelsSafe++;
		} else if (current > next) {
			if (i === 0) dir = "decr";
			else if (dir === "incr") break;

			if (current - next >= 1 && current - next <= 3) levelsSafe++;
		} else {
			break;
		}
	}

	if (levelsSafe === level.length - 1) safe++;

	console.log("Report ", levelsSafe, level);
}

console.log("Number of safe reports: ", safe);
