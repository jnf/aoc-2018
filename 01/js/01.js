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
}

export default Calibration
