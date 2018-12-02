import fs from "fs"
import { computeChecksums } from "./02"

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
