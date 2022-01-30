import React from "react"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"

import { BookDetail } from "./BookDetail"
import { Book } from "../../model"
import { store } from "../../store"


describe("BookDetail", () => {
  const renderWithProvider = (component: React.ReactNode) => render(
    <Provider store={store}>
      { component }
    </Provider>
  )

  it("should render title", () => {
    // given
    const book: Book = {
      id: 1,
      name: "Refactoring",
      description: "Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software."
    }

    // when
    const { container } = renderWithProvider(<BookDetail book={book} />)
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
    const { container } = renderWithProvider(<BookDetail book={book} />)
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
    const { container } = renderWithProvider(<BookDetail book={book} />)
    const description = container.querySelector("p.book-description")

    // then
    expect(description).not.toBeNull()
    expect(description?.innerHTML).toEqual(book.name)
  })

  it("should renders reviews", () => {
    const book: Book = {
      id: 1,
      name: "Refactoring",
      description: "Martin Fowler’s Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software.",
      reviews: [
        { id: 1, name: "Juntao", date: "2018/06/21", content: "Excellent work, really impressed by your efforts", bookId: 1 }
      ]
    }

    const { container } = renderWithProvider(<BookDetail book={book} />)
    const reviews = container.querySelectorAll("div[data-test='review-container'] [data-test='review']")

    expect(reviews.length).toBe(1)
    expect(reviews[0].innerHTML).toEqual("Juntao")
  })

  it("should renders review from", () => {
    const book: Book = {
      id: 1,
      name: "Refactoring",
      description: "Martin Fowler’s Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software.",
    }

    const { container } = renderWithProvider(<BookDetail book={book} />)
    const form = container.querySelector("form")
    const name = container.querySelector("input[name='name']")
    const content = container.querySelector("textarea[name='content']")
    const submit = container.querySelector("button[name='submit']")

    expect(form).toBeInTheDocument()
    expect(name).toBeInTheDocument()
    expect(content).toBeInTheDocument()
    expect(submit).toBeInTheDocument()
  })
})
