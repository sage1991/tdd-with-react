import { Calculator } from "./Calculator"

describe("calculator", () => {
  describe("should perform addition", () => {

    // setup
    let calculator: Calculator
    beforeEach(() => {
      calculator = new Calculator(2)
    })
    afterEach(() => {
      console.log("some clean up task")
    })

    it("adds two positive numbers", () => {
      const result = calculator.add(1.333, 3.2)
      expect(result).toEqual(4.53)
    })

    it("adds two negative numbers", () => {
      const result = calculator.add(-1.333, -3.2)
      expect(result).toEqual(-4.53)
    })
  })

  it("should perform subtraction", () => {})
  it("should perform multiplication", () => {})
  it("should perform division", () => {})
})
