import { reducer, StoreState } from "./slices"
import { fetchBooks } from "../actions"
import { Book } from "../../model"


describe("Reducers", () => {
  const initialState: StoreState = {
    loading: false,
    error: false,
    books: [],
    keyword: ""
  }

  it("should show loading when request is sent", () => {
    const action = { type: fetchBooks.pending }
    const state = reducer(initialState, action)
    expect(state.loading).toBeTruthy()
  })

  it("should add books to state when request successful", () => {
    const books: Book[] = [
      { id: 1, name: "Refactoring", description: "description" },
      { id: 2, name: "Domain-driven design", description: "description" }
    ]

    const action = { type: fetchBooks.fulfilled, payload: books }
    const state = reducer(initialState, action)
    expect(state.books).toBe(books)
  })


})
