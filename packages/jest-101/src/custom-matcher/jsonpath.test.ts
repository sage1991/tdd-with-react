describe("jsonpath", () => {
  it("matches jsonpath", () => {
    const user = { name: "kim" }
    expect(user).toMatchJsonPath("$.name")
  })

  it("doesn't match jsonpath", () => {
    const user = {
      name: "kim",
      address: "Seoul, Korea"
    }
    expect(user).not.toMatchJsonPath("$.age")
  })
})
