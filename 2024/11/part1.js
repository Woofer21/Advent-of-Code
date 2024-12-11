const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const stones = input.split(" ").map((stone) => parseInt(stone));
const blinks = 25;

for (let blinkNum = 0; blinkNum < blinks; blinkNum++) {
	for (let stoneNum = 0; stoneNum < stones.length; stoneNum++) {
		const stone = stones[stoneNum];
		const stoneString = stone.toString();

		if (stone === 0) {
			stones[stoneNum] = 1;
		} else if (stoneString.length % 2 === 0) {
			const firstHalf = stoneString.substring(0, Math.ceil(stoneString.length / 2));
			const secondHalf = stoneString.substring(Math.floor(stoneString.length / 2));

			stones.splice(stoneNum, 1, parseInt(firstHalf), parseInt(secondHalf));
			stoneNum++;
		} else {
			stones[stoneNum] = stones[stoneNum] * 2024;
		}
	}
}

console.log("Total Stones: ", stones.length);
