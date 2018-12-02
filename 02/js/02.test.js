import Checksum from "./02"

describe("compute", () => {
  test("can parse an input file", (done) => {
    const checksum = new Checksum("./smoltest")
    const expected = 12
    const callback = ({dubs, trips}) => {
      expect(dubs * trips).toEqual(expected)
      done()
    }

    checksum.compute(callback)
  })

  test("verify p1 solution", (done) => {
    const checksum = new Checksum("./input")
    const expected = 8715
    const callback = ({dubs, trips}) => {
      expect(dubs * trips).toEqual(expected)
      done()
    }

    checksum.compute(callback)
  })
})
