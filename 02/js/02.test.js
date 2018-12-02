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
})
