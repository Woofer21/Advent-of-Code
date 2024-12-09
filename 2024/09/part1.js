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

let reverseIndex = reconstructed.length - 1;
for (let i = 0; i < reconstructed.length; i++) {
	const value = reconstructed[i];

	if (i === reverseIndex) break;

	if (value === ".") {
		while (reconstructed[reverseIndex] === ".") {
			reverseIndex--;
		}

		reconstructed[i] = reconstructed[reverseIndex];
		reconstructed[reverseIndex] = ".";
		reverseIndex--;
	}
}

reconstructed.splice(reverseIndex + 1);

let total = 0;
for (let i = 0; i < reconstructed.length; i++) {
	total += reconstructed[i] * i;
}

console.log("Filesystem Checksum: ", total);
