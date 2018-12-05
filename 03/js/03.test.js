import fs from "fs"
import { computeAreaOfGrid, computeOverlepOfGrid, insertIntoGrid, parse } from "./03"

describe("p1 -- overlapping squares", () => {
  test("can parse lines of the input", () => {
    const lines = fs.readFileSync("./p1smol", "utf-8").split("\n").filter(Boolean)
    const actual = parse(lines)
    const expected = [[1, 1, 3, 4, 4], [2, 3, 1, 4, 4], [3, 5, 5, 2, 2]]

    expect(actual).toEqual(expected)
  })

  test("can insert a line into a new grid", () => {
    // should produce:
    // . . . [undefined]
    // . x x [undefined, 1, 1]
    // . x x [undefined, 1, 1]
    const line = [1, 1, 1, 2, 2]
    const actual = insertIntoGrid([], ...line)
    const expected = [undefined, [undefined, 1, 1], [undefined, 1, 1]]

    expect(actual).toEqual(expected)
  })

  test("gets rows and columns right", () => {
    // new grid should be:
    // . . x [undefined, undefined, 1]
    // . . x [undefined, undefined, 1]
    // . . x [undefined, undefined, 1]
    const line = [3, 2, 0, 1, 3]
    const actual = insertIntoGrid([], ...line)
    const expected = [[undefined, undefined, 1], [undefined, undefined, 1], [undefined, undefined, 1]]
    expect(actual).toEqual(expected)
  })

  test("can insert a new line into an existing grid", () => {
    const grid = [undefined, [undefined, 1, 1], [undefined, 1, 1]] // same grid as test above
    const line = [2, 0, 0, 2, 2]

    // new grid should be:
    // x x . [1, 1]
    // x + x [1, 2, 1]
    // . x x [undefined, 1, 1]
    const actual = insertIntoGrid(grid, ...line)
    const expected = [[1, 1], [1, 2, 1], [undefined, 1, 1]]
    expect(actual).toEqual(expected)

    // new grid should be:
    // x x . x [1, 1, undefined, 1]
    // x + x x [1, 1, 1, 1]
    // . x x x [undefined, 1, 1, 1]
    const line2 = [3, 3, 0, 1, 3]
    const actual2 = insertIntoGrid(grid, ...line2)
    const expected2 = [[1, 1, undefined, 1], [1, 2, 1, 1], [undefined, 1, 1, 1]]
    expect(actual2).toEqual(expected2)
  })

  test("can compute area (sum of used indices) of grid", () => {
    const grid = [[1, 1], [1, 1, 1], [undefined, 1, 1], undefined]
    const actual = computeAreaOfGrid(grid)

    expect(actual).toEqual(7)
  })

  test("can compute area of grid as it changes over time", () => {
    const line1 = [1, 1, 1, 2, 2]
    const line2 = [2, 0, 0, 2, 2]
    const grid = insertIntoGrid([], ...line1)

    const area1 = computeAreaOfGrid(grid)
    expect(area1).toEqual(4)

    const area2 = computeAreaOfGrid(insertIntoGrid(grid, ...line2))
    expect(area2).toEqual(7)
  })

  test("can compute final area of grid after parsing lines from a file", () => {
    const raw = fs.readFileSync("./p1smol", "utf-8").split("\n").filter(Boolean)
    const lines = parse(raw)
    const area = computeAreaOfGrid(lines.reduce((g, l) => insertIntoGrid(g, ...l), []))
    expect(area).toEqual(32)
  })

  test("can computer overlap (indices used more than once) of grid", () => {
    const grid = [[1, 1], [1, 2, 4], [undefined, 1, 1], undefined]
    const actual = computeAreaOfGrid(grid, 1)

    expect(actual).toEqual(2)
  })

  test("can compute final overlap of grid after parsing lines from a file", () => {
    const raw = fs.readFileSync("./p1smol", "utf-8").split("\n").filter(Boolean)
    const lines = parse(raw)
    const area = computeAreaOfGrid(lines.reduce((g, l) => insertIntoGrid(g, ...l), []), 1)
    expect(area).toEqual(4)
  })

  test("verifies p1 solution", () => {
    const raw = fs.readFileSync("./input", "utf-8").split("\n").filter(Boolean)
    const lines = parse(raw)
    const area = computeAreaOfGrid(lines.reduce((g, l) => insertIntoGrid(g, ...l), []), 1)
    expect(area).toEqual(108961)
  })
})
