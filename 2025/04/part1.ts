import fs from "fs";

const input = fs.readFileSync("./input.txt", "utf8");

const grid = input.split("\n").map((l) => l.split(""))
let accessible = 0

for (let y = 0; y < grid.length; y++) {
  const row = grid[y]

  for (let x = 0; x < row.length; x++) {
    const char = row[x]
    let count = 0

    if (char === "@") {
      if (x > 0 && y > 0 && grid[y - 1][x - 1] === "@") count++
      if (x > 0 && row[x - 1] === "@") count++
      if (y < grid.length - 1 && grid[y + 1][x - 1] === "@") count++
      if (y > 0 && grid[y - 1][x] === "@") count++
      if (y < grid.length - 1 && grid[y + 1][x] === "@") count++
      if (y > 0 && x < row.length - 1 && grid[y - 1][x + 1] === "@") count++
      if (x < row.length - 1 && row[x + 1] === "@") count++
      if (y < grid.length - 1 && x < row.length - 1 && grid[y + 1][x + 1] === "@") count++

      if (count < 4) accessible++
    }
  }
}

console.log("You can access ", accessible)