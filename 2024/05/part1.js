const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const [allRules, allPrints] = input.split(/\n\s*\n/);
const rulesNumbers = allRules
	.split("\n")
	.map((rule) => rule.split("|").map((number) => parseInt(number)));
const printNumbers = allPrints
	.split("\n")
	.map((print) => print.split(",").map((number) => parseInt(number)));

const rules = new Map();
for (const [number, rule] of rulesNumbers) {
	if (rules.has(`n${number}`)) rules.set(`n${number}`, rules.get(`n${number}`).concat(rule));
	else rules.set(`n${number}`, [rule]);
}

let sum = 0;
for (const job of printNumbers) {
	let jobFail = false;

	for (const index in job) {
		const number = job[index];
		if (!rules.has(`n${number}`)) continue;

		let fail = false;
		const rule = rules.get(`n${number}`);

		for (const value of rule) {
			const valueIndex = job.indexOf(value);

			if (valueIndex === -1) continue;
			if (index > valueIndex) fail = true;
		}

		if (fail) jobFail = true;
	}

	if (!jobFail) sum += job[Math.floor(job.length / 2)];
}

console.log(sum);
