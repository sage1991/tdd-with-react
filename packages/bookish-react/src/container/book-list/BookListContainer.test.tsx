import React from "react"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import MockAdapter from "axios-mock-adapter"
import { Provider } from "react-redux"
import axios from "axios"

import { store } from "../../store"
import { BookListContainer } from "./BookListContainer"
import { Book } from "../../model"


describe("BookListContainer", () => {
  const renderWithProvider = (component: React.ReactNode) => render(
    <Provider store={store}>
      <MemoryRouter>
        { component }
      </MemoryRouter>
    </Provider>
  )

  it("should render books", async () => {
    const books: Book[] = [
      { id: 1, name: "Refactoring", description: "description" },
      { id: 2, name: "Domain-driven design", description: "description" }
    ]

    const mock = new MockAdapter(axios)
    mock
      .onGet("http://localhost:8080/books?_sort=id&_order=asc&q=")
      .reply(200, books)

    const { findByText } = renderWithProvider(<BookListContainer />)
    const book1 = await findByText("Refactoring")
    const book2 = await findByText("Domain-driven design")

    expect(book1).toBeInTheDocument()
    expect(book2).toBeInTheDocument()
  })

  it("should render error", async () => {
    const mock = new MockAdapter(axios)
    mock
      .onGet("http://localhost:8080/books?_sort=id&_order=asc&q=")
      .networkError()

    const { findByText } = renderWithProvider(<BookListContainer />)
    const error = await findByText("Error...")
    expect(error).toBeInTheDocument()
  })
})
