import Calibrator from "./01"

describe("modulate", () => {
  test("handles single positive change", () => {
    const calibrator = new Calibrator()
    const expected = 1
    calibrator.modulate(1)

    expect(calibrator.frequency).toBe(expected)
  })

  test("handles single negative change", () => {
    const calibrator = new Calibrator()
    const expected = -1
    calibrator.modulate(-1)

    expect(calibrator.frequency).toBe(expected)
  })

  test("handles stream of mixed changes", () => {
    const stream = [1, 1, -2]
    const expected = 0
    const calibrator = new Calibrator()

    stream.forEach(change => calibrator.modulate(change))
    expect(calibrator.frequency).toBe(expected)
  })
})

describe("[static] from", () => {
  test("process smoltest", (done) => {
    const path = "./smoltest"
    const callback = (calibrator) => {
      const expected = -6
      expect(calibrator.frequency).toBe(expected)
      done()
    }

    Calibrator.from(path, callback)
  })

  test("process p1 input", (done) => {
    const path = "./input"
    const callback = (calibrator) => {
      const expected = 595
      expect(calibrator.frequency).toBe(expected)
      done()
    }

    Calibrator.from(path, callback)
  })
})

describe("[static] frequencyPairFrom", () => {
  jest.setTimeout(10000)
  test("process p2smol", (done) => {
    const path = "./p2smol"
    const callback = (frequency) => {
      const expected = 10
      expect(frequency).toBe(expected)
      done()
    }

    Calibrator.frequencyPairFrom(path, callback)
  })

  test("process p2 input", (done) => {
    const path = "./input"
    const callback = (frequency) => {
      const expected = 80598
      expect(frequency).toBe(expected)
      done()
    }

    Calibrator.frequencyPairFrom(path, callback)
  })
})
