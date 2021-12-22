import { Calculator } from "./Calculator"


describe("calculator", () => {
  describe("should perform addition", () => {
    it("adds two positive numbers", () => {
      const calc = new Calculator(2)
      const result = calc.add(1.333, 3.2)
      expect(result).toEqual(4.53)
    })
    it("adds two negative numbers", () => {
      const calc = new Calculator(2)
      const result = calc.add(-1.333, -3.2)
      expect(result).toEqual(-4.53)
    })
  })
  it("should perform subtraction", () => {})
  it("should perform multiplication", () => {})
  it("should perform division", () => {})
})
