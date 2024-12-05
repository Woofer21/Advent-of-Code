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

const failedJobs = [];
for (let ind = 0; ind < printNumbers.length; ind++) {
	const job = printNumbers[ind];

	if (!check(job)) failedJobs.push(job);
}

mainLoop: for (let ind = 0; ind < failedJobs.length; ind++) {
	const job = failedJobs[ind];

	for (let index = 0; index < job.length; index++) {
		const number = job[index];
		if (!rules.has(`n${number}`)) continue;

		const rule = rules.get(`n${number}`);

		for (const value of rule) {
			const valueIndex = job.indexOf(value);

			if (valueIndex === -1) continue;
			if (index > valueIndex) {
				job[index] = value;
				job[valueIndex] = number;
				ind--;
				continue mainLoop;
			}
		}
	}
}

let sum = failedJobs
	.map((job) => job[Math.floor(job.length / 2)])
	.reduce((prev, cur) => prev + cur, 0);

console.log(sum);

function check(job) {
	for (let index = 0; index < job.length; index++) {
		const number = job[index];
		if (!rules.has(`n${number}`)) continue;

		const rule = rules.get(`n${number}`);

		for (const value of rule) {
			const valueIndex = job.indexOf(value);

			if (valueIndex === -1) continue;
			if (index > valueIndex) {
				return false;
			}
		}
	}
	return true;
}
