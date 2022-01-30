import React from "react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { render } from "@testing-library/react"
import MockAdapter from "axios-mock-adapter"
import { Provider } from "react-redux"
import axios from "axios"

import { store } from "../../store"
import { BookDetailContainer } from "./BookDetailContainer"


describe("BookDetailContainer", () => {
  const renderWithProvider = (component: React.ReactNode) => render(
    <Provider store={store}>
      { component }
    </Provider>
  )

  let mock: MockAdapter
  beforeAll(() => mock = new MockAdapter(axios))
  afterEach(() => mock.reset())

  it("should render book detail", async () => {
    mock
      .onGet("http://localhost:8080/books/1")
      .reply(200, { id: 1, name: "Refactoring", description: "description" })

    const { findByText } = renderWithProvider(
      <MemoryRouter initialEntries={["/detail/1"]}>
        <Routes>
          <Route path="/detail/:id" element={<BookDetailContainer />} />
        </Routes>
      </MemoryRouter>
    )

    const bookName = await findByText("Refactoring")
    const bookDescription = await findByText("description")
    expect(bookName).toBeInTheDocument()
    expect(bookDescription).toBeInTheDocument()
  })
})
