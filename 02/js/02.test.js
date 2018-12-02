import { computeChecksums } from "./02"

describe("computeChecksums (p1)", () => {
  test("cna compute a simple checksum", () => {
    const expected = 12
    const { dubs, trips } = computeChecksums("./smoltest")
    expect(dubs * trips).toEqual(expected)
  })

  test("verify p1 solution", () => {
    const expected = 8715
    const { dubs, trips } = computeChecksums("./input")
    expect(dubs * trips).toEqual(expected)
  })
})
