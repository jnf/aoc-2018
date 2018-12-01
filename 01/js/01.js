import fs from "fs"
import readline from "readline"

const state = new WeakMap()
class Calibration {
  constructor (base=0) {
    state.set(this, { frequency: base })
  }

  modulate (change=0) {
    const oldState = state.get(this)
    const frequency = oldState.frequency + Number(change)
    state.set(this, { ...oldState, frequency })
  }

  get frequency () { return state.get(this).frequency }

  static from (path, callback) {
    const calibrator = new Calibration
    const stream = fs.createReadStream(path)
    const reader = readline.createInterface(stream)

    reader.on("line", (line) => calibrator.modulate(line))
    reader.on("close", () => callback(calibrator))
  }

  static frequencyPairFrom(path, callback) {
    const map = { 0: 1 }
    const calibrator = new Calibration
    const checker = () => {
      const pair = Object.entries(map).find(([value, count]) => count > 1)
      if (pair) callback(Number(pair[0]))
      else restreamer()
    }

    const restreamer = () => {
      const stream = fs.createReadStream(path)
      const reader = readline.createInterface(stream)

      reader.on("close", checker)
      reader.on("line", (line) => {
        calibrator.modulate(line)
        const count = (map[calibrator.frequency] || 0) + 1
        map[calibrator.frequency] = count

        if (count > 1) reader.close() // early exit when we find a double
      })
    }

    restreamer()
  }
}

export default Calibration
