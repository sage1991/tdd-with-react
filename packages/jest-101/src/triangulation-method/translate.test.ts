import { translate } from "./translate"


describe("tasking", () => {
  // step 1
  it("translates d to half a dev day", () => {
    const aHalfDevDay = expect.objectContaining({ dev: 0.5 })
    expect(translate("d")).toEqual(aHalfDevDay)
  })

  // step 2
  it("translates D to one dev day", () => {
    const oneDevDay = expect.objectContaining({ dev: 1 })
    expect(translate("D")).toEqual(oneDevDay)
  })

  // step 3
  it("translates dD to one and a half dev day", () => {
    const oneAndAHalfDevDay = expect.objectContaining({ dev: 1.5 })
    expect(translate("dD")).toEqual(oneAndAHalfDevDay)
  })

  it("translates ddDDdD to four and a half dev day", () => {
    const fourAndAHalfDevDay = expect.objectContaining({ dev: 4.5 })
    expect(translate("ddDDdD")).toEqual(fourAndAHalfDevDay)
  })

  // step 4
  it("translates q to a half qa day", () => {
    const aHalfQaDay = expect.objectContaining({ qa: 0.5 })
    expect(translate("q")).toEqual(aHalfQaDay)
  })
})
