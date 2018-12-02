import fs from "fs"
import readline from "readline"

class Checksum {
  constructor (path) {
    this.path = path
  }

  compute (callback=this.log) {
    const stream = fs.createReadStream(this.path)
    const reader = readline.createInterface(stream)
    const result = {
      dubs: 0,
      trips: 0
    }

    const sort = (line) => {
      const map = Array.from(line).reduce((acc, letter) => {
        return {
          ...acc,
          [letter]: (acc[letter] || 0) + 1
        }
      }, {})

      if (Object.values(map).some(val => val === 2)) result.dubs += 1
      if (Object.values(map).some(val => val === 3)) result.trips += 1
    }

    reader.on("line", sort)
    reader.on("close", () => callback(result))
  }

  log (result) {
    console.log(result)
  }
}

export default Checksum
