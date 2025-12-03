import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf8");

const banks = input.split("\n")

let total = 0

for (const bank of banks) {
  const digits = bank.split(""). map(Number)

  let highest = 0
  let secondHighest = 1

  for (let i = 0; i < digits.length - 1; i++) {
    if (digits[i] > digits[highest]) {
      highest = i
      secondHighest = i + 1
    }
  }

  for (let i = highest + 1; i < digits.length; i++) {
    if (digits[i] > digits[secondHighest] && i != highest) secondHighest = i
  }

  const number = parseInt(`${digits[highest]}${digits[secondHighest]}`)
  
  total += number
} 

console.log("The highest joltage you can get is", total)