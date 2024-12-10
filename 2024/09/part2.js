const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const values = input.split("").map((num) => parseInt(num));
const reconstructed = [];

let id = 0;
for (let index = 0; index < values.length; index++) {
	const value = values[index];
	let i = 0;
	if (index % 2 === 0) {
		while (i < value) {
			reconstructed.push(id);
			i++;
		}
		id++;
	} else {
		while (i < value) {
			reconstructed.push(".");
			i++;
		}
	}
}

for (let i = reconstructed.length - 1; i >= 0; i--) {
	const value = reconstructed[i];

	if (value === ".") continue;

	let start = i;
	while (start !== 0 && reconstructed[start] === reconstructed[i]) {
		start--;
	}
	start++;
	const blockLength = i - start + 1;

	let sectorIncrement = 0;
	let sectorStart = 0;
	let sectorLength = 0;

	breakWhile: while (sectorIncrement < reconstructed.length) {
		if (sectorLength === blockLength) break breakWhile;
		if (sectorIncrement === i) break breakWhile;

		if (reconstructed[sectorIncrement] === ".") {
			if (sectorLength === 0) sectorStart = sectorIncrement;
			sectorLength++;
		} else {
			sectorLength = 0;
		}

		sectorIncrement++;
	}

	if (blockLength === sectorLength) {
		for (let j = 0; j < blockLength; j++) {
			reconstructed[sectorStart + j] = value;
			reconstructed[start + j] = ".";
		}
	}

	if (!(blockLength <= 0)) i -= blockLength - 1;
}

let total = 0;
for (let i = 0; i < reconstructed.length; i++) {
	if (reconstructed[i] === ".") continue;
	total += reconstructed[i] * i;
}

console.log("Filesystem Checksum: ", total);
