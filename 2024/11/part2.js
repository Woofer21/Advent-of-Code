const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");
const stoneMap = new Map();
input.split(" ").map((stone) => {
	const stoneNum = parseInt(stone);

	if (stoneMap.has(stoneNum)) stoneMap.set(stoneNum, stoneMap.get(stoneNum) + 1);
	else stoneMap.set(stoneNum, 1);

	return stoneNum;
});
const blinks = 75;

for (let blinkNum = 0; blinkNum < blinks; blinkNum++) {
	const newStoneMap = new Map(stoneMap);

	for (const [stoneNum, stoneCount] of newStoneMap) {
		const stoneString = stoneNum.toString();

		if (stoneNum === 0) {
			if (stoneMap.has(1)) stoneMap.set(1, stoneMap.get(1) + stoneCount);
			else stoneMap.set(1, stoneCount);

			if (stoneMap.get(0) - stoneCount <= 0) stoneMap.delete(stoneNum);
			else stoneMap.set(stoneNum, stoneMap.get(0) - stoneCount);
		} else if (stoneString.length % 2 === 0) {
			const firstHalf = parseInt(stoneString.substring(0, Math.ceil(stoneString.length / 2)));
			const secondHalf = parseInt(stoneString.substring(Math.floor(stoneString.length / 2)));

			if (stoneMap.has(firstHalf)) stoneMap.set(firstHalf, stoneMap.get(firstHalf) + stoneCount);
			else stoneMap.set(firstHalf, stoneCount);
			if (stoneMap.has(secondHalf)) stoneMap.set(secondHalf, stoneMap.get(secondHalf) + stoneCount);
			else stoneMap.set(secondHalf, stoneCount);

			if (stoneMap.get(stoneNum) - stoneCount <= 0) stoneMap.delete(stoneNum);
			else stoneMap.set(stoneNum, stoneMap.get(stoneNum) - stoneCount);
		} else {
			const newStone = stoneNum * 2024;
			if (stoneMap.has(newStone)) stoneMap.set(newStone, stoneMap.get(newStone) + stoneCount);
			else stoneMap.set(newStone, stoneCount);

			if (stoneMap.get(stoneNum) - stoneCount <= 0) stoneMap.delete(stoneNum);
			else stoneMap.set(stoneNum, stoneMap.get(stoneNum) - stoneCount);
		}
	}
}

const totalStones = Array.from(stoneMap.values()).reduce((a, b) => a + b, 0);

console.log("Total Stones: ", totalStones);
