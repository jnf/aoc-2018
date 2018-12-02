import fs from "fs"

const howDifferent = (x, y) => Array.from(x).reduce((acc, letter, index) => {
  if (letter !== y[index]) acc += 1
  return acc
}, 0)

const letterMap = (string) => Array.from(string).reduce((map, letter) => ({
  ...map,
  [letter]: (map[letter] || 0) + 1
}), {})

export const computeChecksums = (path) => {
  const lines = fs.readFileSync(path, "utf-8").split("\n")
export const computeChecksums = (lines=[]) => {
  return lines.reduce((acc, line) => {
    const map = letterMap(line)
    if (Object.values(map).some(val => val === 2)) acc.dubs += 1
    if (Object.values(map).some(val => val === 3)) acc.trips += 1

    return acc
  }, { dubs: 0, trips: 0 })
}
