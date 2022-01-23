import React from "react"
import { render } from "@testing-library/react"

import { BookDetail } from "./BookDetail"
import { Book } from "../../model"


describe("BookDetail", () => {
  it("should render title", () => {
    // given
    const book: Book = {
      id: 1,
      name: "Refactoring",
      description: "Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software."
    }

    // when
    const { container } = render(<BookDetail book={book} />)
    const title = container.querySelector(".book-title")

    // then
    expect(title).not.toBeNull()
    expect(title?.innerHTML).toEqual(book.name)
  })

  it("should render description", () => {
    // given
    const book: Book = {
      id: 1,
      name: "Refactoring",
      description: "Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software."
    }

    // when
    const { container } = render(<BookDetail book={book} />)
    const description = container.querySelector("p.book-description")

    // then
    expect(description).not.toBeNull()
    expect(description?.innerHTML).toEqual(book.description)
  })

  it("should displays the book name when no description was given", () => {
    // given
    const book: Book = {
      id: 1,
      name: "Refactoring"
    }

    // when
    const { container } = render(<BookDetail book={book} />)
    const description = container.querySelector("p.book-description")

    // then
    expect(description).not.toBeNull()
    expect(description?.innerHTML).toEqual(book.name)
  })

  it("should shows more link when description is too long", () => {

  })
})
