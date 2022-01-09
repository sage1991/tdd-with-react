import { add } from "./add"


describe("addition", () => {
  it("return 5 when adding 2 and 3", () => {
    const result = add(2, 3)
    expect(result).toBe(5)
  })

  it("return 6 when adding 2 and 4", () => {
    const result = add(2, 4)
    expect(result).toBe(6)
  })

  it("return 7 when adding 3 and 4", () => {
    const result = add(3, 4)
    expect(result).toBe(7)
  })
})
