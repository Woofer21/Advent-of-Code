import fs from "fs"

const input = fs.readFileSync("input.txt", "utf8")

const sets = input.split("\n\n")

const ranges = sets[0].split("\n").map((r) => r.split("-").map(Number))

let freshCount = 0

let didChange = true
while (didChange) {
  didChange = false

  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i]

    for (let j = 0; j < ranges.length; j++) {
      if (i === j) continue
      
      const otherRange = ranges[j]

      // console.log({ranges, i, j, range, otherRange})

      // checks if bottom of range in-between other range
      const bottomInOther = otherRange[0] >= range[0] && otherRange[0] <= range[1] 
      // checks if top of range in-between other range
      const topInOther = otherRange[1] >= range[0] && otherRange[1] <= range[1]

      // console.log({bottomInOther, topInOther})

      if (bottomInOther && !topInOther) {
        ranges[i][1] = otherRange[1]
        didChange = true
        ranges.splice(j, 1)
        if (i > j)i--
        break
      } else if (topInOther && !bottomInOther) {
        ranges[i][0] = otherRange[0]
        didChange = true
        ranges.splice(j, 1)
        if (i > j) i--
        break
      } else if (bottomInOther && topInOther) {
        ranges.splice(j, 1)
        if (i > j) i--
        break;
      }
    }
  }
}

// console.log({ranges})

for (const range of ranges) {
  freshCount += range[1] - range[0] + 1
}

console.log("The number of fresh ingredients is:", freshCount)