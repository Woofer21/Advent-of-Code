import fs from "fs"

const input = fs.readFileSync("input.txt", "utf8")

const sets = input.split("\n\n")

const ranges = sets[0].split("\n").map((r) => r.split("-").map(Number))
const numbers = sets[1].split("\n").map(Number)

let freshCount = 0

for (const number of numbers) {
  for (const range of ranges) {
    if (number >= range[0] && number <= range[1]) {
      freshCount++
      break
    }
  }
}

console.log("The number of fresh ingredients is:", freshCount)