const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const reports = input
	.split("\n")
	.map((report) => report.split(" ").map((level) => parseInt(level)));
let safe = 0;

for (const level of reports) {
	const permutations = permutate(level);
	const permutationsDifferences = [];
	const initialDifferences = [];

	for (const permutation of permutations) {
		const localDifferences = [];

		for (let i = 0; i < permutation.length - 1; i++) {
			const difference = permutation[i] - permutation[i + 1];
			localDifferences.push(difference);
		}

		permutationsDifferences.push(localDifferences);
	}

	for (let i = 0; i < level.length - 1; i++) {
		const difference = level[i] - level[i + 1];
		initialDifferences.push(difference);
	}

	if (checkDirectionPass(initialDifferences) && checkDifferenceInBounds(initialDifferences)) safe++;
	else {
		let isOneSafe = false;

		for (const permutation of permutationsDifferences) {
			if (checkDirectionPass(permutation) && checkDifferenceInBounds(permutation)) isOneSafe = true;
		}

		if (isOneSafe) safe++;
	}

	console.log("Report ", level);
}

console.log("Number of safe reports: ", safe);

function permutate(level) {
	const permutations = [];
	const length = level.length;

	for (let i = 0; i < length; i++) {
		const newLevel = [...level];
		newLevel.splice(i, 1);
		permutations.push(newLevel);
	}

	return permutations;
}

function checkDirectionPass(differences) {
	let dir = "";
	let levelsSafe = 0;

	for (const difference of differences) {
		if (dir === "") dir = difference < 0 ? "incr" : "decr";

		if (difference < 0 && dir === "incr") levelsSafe++;
		else if (difference > 0 && dir === "decr") levelsSafe++;
		else break;
	}

	return levelsSafe === differences.length;
}

function checkDifferenceInBounds(differences) {
	for (const difference of differences) {
		if (Math.abs(difference) < 1 || Math.abs(difference) > 3) return false;
	}

	return true;
}
