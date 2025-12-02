import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");

const ranges = input.split(",")

let total = 0;

for (const range of ranges) {
  const [start, end] = range.split("-").map(Number);

  for (let i = start; i <= end; i++) {
    const strNum = i.toString();

    if (strNum.length % 2 === 0) {
      const midIndx = (strNum.length / 2);
  
      const firstHalf = strNum.slice(0, midIndx);
      const secondHalf = strNum.slice(midIndx);

      if (firstHalf === secondHalf)
        total += i;
    }
  }
}

console.log("Total of all bad IDs: ", total)