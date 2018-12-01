import fs from "fs"
import readline from "readline"

class Calibrator {
  constructor (base=0) {
    this.frequency = base
    this.counts = { 0: 1 }
  }

  modulate (change=0) {
    this.frequency += Number(change)
    this.counts[this.frequency] = (this.counts[this.frequency] || 0) + 1
  }

  static from (path, callback) {
    const cali = new Calibrator
    const stream = fs.createReadStream(path)
    const reader = readline.createInterface(stream)

    reader.on("line", (line) => cali.modulate(line))
    reader.on("close", () => callback(cali))
  }

  static frequencyPairFrom(path, callback) {
    const cali = new Calibrator
    const checker = () => {
      const pair = Object.entries(cali.counts).find(([_, count]) => count > 1)
      if (pair) callback(Number(pair[0]))
      else restreamer()
    }

    const restreamer = () => {
      const stream = fs.createReadStream(path)
      const reader = readline.createInterface(stream)

      reader.on("close", checker)
      reader.on("line", (line) => {
        cali.modulate(line)
        if (cali.counts[cali.frequency] > 1) reader.close()
      })
    }

    restreamer()
  }
}

export default Calibrator
