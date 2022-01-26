import React, { ReactNode } from "react"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import { BookList } from "./BookList"
import { Book } from "../../model"


const renderWithRouter = (component: ReactNode) => {
  return render(
    <MemoryRouter>
      { component }
    </MemoryRouter>
  )
}

describe("BookList", () => {
  it("should loading", () => {
    const { container } = renderWithRouter(<BookList items={[]} loading error={false} />)
    const content = container.querySelector("p")
    expect(content).not.toBeNull()
    expect(content?.innerHTML).toContain("Loading")
  })

  it("should error", () => {
    const { container } = renderWithRouter(<BookList items={[]} loading={false} error />)
    const content = container.querySelector("p")
    expect(content).not.toBeNull()
    expect(content?.innerHTML).toContain("Error")
  })

  it("should render books", () => {
    const books: Book[] = [
      {
        id: 1,
        name: "Refactoring",
        description: "Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software."
      },
      {
        id: 2,
        name: "Domain-driven design",
        description: "Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software."
      }
    ]
    const { container } = renderWithRouter(<BookList items={books} loading={false} error={false} />)
    const titles = Array
      .from(container.querySelectorAll("[data-test='book-name']"))
      .map((element) => element.innerHTML)
    expect(titles).toEqual([ "Refactoring", "Domain-driven design" ])
  })
})
