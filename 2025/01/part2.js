const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf8");

const lines = input.split("\n");

let pos = 50
let count = 0

for (const line of lines) {
  const dir = line[0];
  let clicks = parseInt(line.slice(1));

  while (clicks > 0) {
    if (dir === "L") pos--;
    else pos++;

    if (pos > 99) pos = 0;
    if (pos < 0) pos = 99;
    if (pos == 0) count++;

    clicks--;
  }
}

console.log("The password is: ", count)
