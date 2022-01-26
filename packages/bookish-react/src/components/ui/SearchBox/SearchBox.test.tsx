import React from "react"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { SearchBox } from "./SearchBox"


describe("SearchBox", () => {
  it("should renders input", () => {
    const onTextChange = jest.fn()
    const { container } = render(<SearchBox value="" onChange={onTextChange} />)
    const input = container.querySelector("input[type='text']")
    expect(input).not.toBeNull()
    userEvent.type(input!, "domain")
    expect(onTextChange).toHaveBeenCalled()
  })

  it("should trim empty strings", () => {
    const onTextChange = jest.fn()
    const { container } = render(<SearchBox value="" onChange={onTextChange} />)
    const input = container.querySelector("input[type='text']")
    expect(input).not.toBeNull()
    userEvent.type(input!, "  ")
    expect(onTextChange).not.toHaveBeenCalled()
  })
})
