import { fetchUser } from "./fetchUser"

describe("mock api call", () => {
  const user = {
    name: "kim",
    address: "Seoul, Korea"
  }

  it("mock fetch", () => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve(user))
    fetchUser(111).then(console.log)
    expect(global.fetch).toHaveBeenCalledWith(`https://localhost/users/111`)
  })
})
