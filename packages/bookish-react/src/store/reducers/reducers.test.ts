import { reducer, StoreState } from "./slices"
import { fetchBooks, saveReview } from "../actions"
import { Book, Review } from "../../model"


describe("Reducers", () => {
  const initialState: StoreState = {
    loading: false,
    error: false,
    books: [],
    keyword: "",
    detail: {
      id: -1,
      name: "",
      description: ""
    }
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

  it("should add reviews to state when request successful", () => {
    const initialState: StoreState = {
      loading: false,
      error: false,
      books: [{ id: 1, name: "Refactoring", description: "description" }],
      keyword: "",
      detail: {
        id: -1,
        name: "",
        description: ""
      }
    }
    const review: Review = {
      id: 1,
      bookId: 1,
      name: "Harry",
      content: "Very Good!!",
      date: ""
    }

    const action = { type: saveReview.fulfilled, payload: review }
    const state = reducer(initialState, action)

    expect(state.books.length).toBe(1)
    expect(state.books[0].reviews).toContain(review)
  })
})
