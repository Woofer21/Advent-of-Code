const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const lines = input.split("\n");

let pos = 50
let count = 0

for (const line of lines) {
  const dir = line[0];
  const steps = parseInt(line.slice(1)) % 100;
  // ^ mod 100 to remove any time that we go around a full loop

  if (dir === "L") {
    pos -= steps;

    // offset by 100 to account for 0 being a spot
    if (pos < 0) pos = 100 + pos;
  } else {
    pos += steps;
    
    if (pos > 99) {
      newSteps = pos - 100;
      pos = 0 + newSteps;
    }
  }

  if (pos == 0) count++;
}

console.log("The password is: ", count)