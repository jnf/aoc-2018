import fs from "fs"
import { computeChecksums, findPair } from "./02"

describe("computeChecksums (p1)", () => {

  test("can compute a simple checksum", () => {
    const lines = fs.readFileSync("./smoltest", "utf-8").split("\n")
    const { dubs, trips } = computeChecksums(lines)
    const expected = 12
    expect(dubs * trips).toEqual(expected)
  })

  test("verify p1 solution", () => {
    const lines = fs.readFileSync("./input", "utf-8").split("\n")
    const { dubs, trips } = computeChecksums(lines)
    const expected = 8715
    expect(dubs * trips).toEqual(expected)
  })
})

describe("findPair (p2)", () => {
  test("can find a pair based on an input string and comparator", () => {
    const lines = fs.readFileSync("./p2smol", "utf-8").split("\n")
    const expected = ["fghij", "fguij"]
    const actual = findPair(lines)

    expect(actual).toEqual(expected)
  })

  test("verify p2 pair", () => {
    const lines = fs.readFileSync("./input", "utf-8").split("\n")
    const expected = ["fzvstwblgqkhpuixdrnevmaycd", "fivstwblgqkhpuixdrnevmaycd"]
    const actual = findPair(lines)

    expect(actual).toEqual(expected)
  })
})
