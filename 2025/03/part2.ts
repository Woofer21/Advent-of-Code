import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf8");

const banks = input.split("\n")

let total = 0

for (const bank of banks) {
  const digits = bank.split(""). map(Number)

  // [indx, value]
  let highest = Array.from(Array(12).fill(""), () => [0, null])

  for (let i = 0; i < 12; i++) {
    for (let j = i == 0 ? highest[0][0]! : highest[i - 1][0]! + 1; j < digits.length - (11 - i); j++) {
      const curVal = highest[i][1]

      if (curVal === null || digits[j] > curVal) {
        highest[i][0] = j
        highest[i][1] = digits[j]
      } 
    }
  }

  let str = ""
  for (const [_, value] of highest) {
    str += value
  }

  const number = parseInt(str)
  total += number
} 

console.log("The highest joltage you can get is", total)
