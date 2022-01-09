describe("jest.fn", () => {
  it("create a callable function", () => {
    const mock = jest.fn()
    mock("kim")
    expect(mock).toHaveBeenCalled()
    expect(mock).toHaveBeenCalledWith("kim")
    expect(mock).toHaveBeenCalledTimes(1)
  })
})

describe("mock implementation", () => {
  it("create a fake add function", () => {
    type AddFn = (a: number, b: number) => number
    const fakeAdd: AddFn = jest.fn().mockImplementation((a, b) => a + b)
    expect(fakeAdd(1, 2)).toBe(3)
    expect(fakeAdd).toHaveBeenCalledTimes(1)
    expect(fakeAdd).toHaveBeenCalledWith(1, 2)
  })
})
