export class Calculator {
  constructor(private precision: number) {}

  add(x: number, y: number) {
    return Number((x + y).toFixed(this.precision))
  }

  subtract(x: number, y: number) {
    return Number((x - y).toFixed(this.precision))
  }

  multiple(x: number, y: number) {
    return Number((x * y).toFixed(this.precision))
  }

  divide(x: number, y: number) {
    return Number((x / y).toFixed(this.precision))
  }
}
