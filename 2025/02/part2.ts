import fs from "fs";

const input = fs.readFileSync("input.txt", "utf-8");

const ranges = input.split(",")

let total = 0;

for (const range of ranges) {
  const [start, end] = range.split("-").map(Number);

  for (let i = start; i <= end; i++) {
    const strNum = i.toString();

    let hit = false;
    let step = 0;
    while (!hit && step < strNum.length / 2) {
      let re = new RegExp(String.raw`.{0,${step + 1}}`, "g")
      const parts = strNum.match(re) || []

      let good = true;
      for (let j = 0; j < parts.length - 2; j++) {
        const curr = parseInt(parts[j])
        const next = parseInt(parts[j + 1])

        if (curr !== next) {
          good = false;
          break;
        }
      }

      if (good && strNum.length < 2) good = false;

      hit = good;
      step++;
    }

    if (hit) total += i
  }
}

console.log("Total of all bad IDs: ", total)