import { User } from "./User"

describe("User", () => {
  it("creates user name", () => {
    // given: describe all the preparation
    const user = User.create({
      name: "kim",
      address: "Seoul, Korea"
    })

    // when: trigger action or change state
    const name = user.getName()

    // then: examine result
    expect(name).toEqual("kim")
  })
})

