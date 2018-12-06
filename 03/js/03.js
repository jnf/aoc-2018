const lineRegex = /^\#(\d+)\s+\@\s+(\d+),(\d+):\s+(\d+)x(\d+)/ //lol
const extractData = (line) => {
  const raw = lineRegex.exec(line)
  raw.shift() //don't want the first entry--it's the source string
  return raw.map(Number)
}

export const parse = (lines) => lines.map(extractData)

export const insertIntoGrid = (grid=[], id, left, top, width, height) => {
  for (let y = top; y < top + height; y++) {
    for (let x = left; x < left + width; x++) {
        if (!grid[y]) grid[y] = []
        grid[y][x] = (grid[y][x] || 0) + 1
    }
  }

  return grid
}

export const computeAreaOfGrid = (grid=[], uses=0) => {
  const rows = (sum, row) => sum += (row || []).reduce(cells, 0)
  const cells = (sum, cell) => sum += (Number(cell) || 0) > uses ? 1 : 0

  return grid.reduce(rows, 0)
}

export const findDistinctClaim = (grid=[], claims=[], uses=1) => {
  const distinct = claims.filter(([id, left, top, width, height]) => {
    for (let y = top; y < top + height; y++) {
      for (let x = left; x < left + width; x++) {
        if (grid[y][x] > uses) return false
      }
    }
    return true
  })

  return distinct[0]
}
