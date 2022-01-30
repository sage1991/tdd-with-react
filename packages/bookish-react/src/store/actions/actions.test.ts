import configureMockStore, { MockStore } from "redux-mock-store"
import thunk from "redux-thunk"
import axios from "axios"

import { setSearchKeyword, fetchBooks, fetchBookById, saveReview } from "./actions"
import { SET_SEARCH_KEYWORD } from "./type"
import { Book, Review } from "../../model"


const mockStore = configureMockStore([ thunk ])

describe("Actions", () => {
  let store: MockStore
  beforeEach(() => {
    store = mockStore({
      books: [],
      loading: false,
      error: false,
      keyword: "",
      detail: {
        id: -1,
        name: "",
        description: ""
      }
    })
  })

  it("should set the search keyword", () => {
    const keyword = ""
    const expected = {
      type: SET_SEARCH_KEYWORD,
      payload: keyword
    }

    const action = setSearchKeyword(keyword)
    expect(action).toEqual(expected)
  })

  it("should fetches data successfully", () => {
    const books: Book[] = [
      { id: 1, name: "Refactoring", description: "description" },
      { id: 2, name: "Domain-driven design", description: "description" }
    ]

    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }))

    const expectedActions = expect.arrayContaining([
      expect.objectContaining({ type: fetchBooks.pending.type }),
      expect.objectContaining({ type: fetchBooks.fulfilled.type, payload: books })
    ])

    // @ts-ignore
    store.dispatch(fetchBooks("")).then(() => {
      const actions = store.getActions()
      expect(actions).toEqual(expectedActions)
    })
  })

  it("should fetches data with error", () => {
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.reject({ message: "Something went wrong" }))

    const expectedActions = expect.arrayContaining([
      expect.objectContaining({ type: fetchBooks.pending.type }),
      expect.objectContaining({ type: fetchBooks.rejected.type })
    ])

    // @ts-ignore
    store.dispatch(fetchBooks("")).then(() => {
      const actions = store.getActions()
      expect(actions).toEqual(expectedActions)
    })
  })

  it("should search data with keyword", () => {
    const books: Book[] = [
      { id: 1, name: "Refactoring", description: "description" },
      { id: 2, name: "Domain-driven design", description: "description" }
    ]

    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }))

    // @ts-ignore
    store.dispatch(fetchBooks("domain")).then(() => {
      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/books?_sort=id&_order=asc&q=domain")
    })
  })

  it("should fetch book by id", () => {
    const book: Book = { id: 1, name: "Refactoring", description: "description" }
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve(book))

    // @ts-ignore
    store.dispatch(fetchBookById(1)).then(() => {
      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/books/1?_embed=reviews")
    })
  })

  it("should save review", () => {
    const review: Review = {
      id: 1,
      name: "Harry",
      content: "Excellent work!!",
      date: "2022-01-31",
      bookId: 1
    }

    axios.post = jest
      .fn()
      .mockImplementation(() => Promise.resolve({}))

    // @ts-ignore
    store.dispatch(saveReview(review)).then(() => {
      expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/reviews", review)
    })
  })
})
