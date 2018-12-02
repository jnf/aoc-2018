import { Checksum } from "./02"

describe("Checksum (p1)", () => {
  describe("compute", () => {
    test("can parse an input file", () => {
      const expected = 12
      const { dubs, trips } = Checksum("./smoltest")
      expect(dubs * trips).toEqual(expected)
    })

    test("verify p1 solution", () => {
      const expected = 8715
      const { dubs, trips } = Checksum("./input")
      expect(dubs * trips).toEqual(expected)
    })
  })
})
