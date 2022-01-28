import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import axios from "axios"

import { setSearchKeyword, fetchBooks } from "./actions"
import { SET_SEARCH_KEYWORD } from "./type"
import { Book } from "../../model"


const mockStore = configureMockStore([ thunk ])

describe("BookListContainer related actions", () => {
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

    const expectedActions = [
      { type: fetchBooks.pending },
      { type: fetchBooks.fulfilled, payload: books }
    ]

    const store = mockStore({ books: [] })
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

    const expectedActions = [
      { type: fetchBooks.pending },
      { type: fetchBooks.rejected }
    ]

    const store = mockStore({ books: [] })
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

    const store = mockStore({ books: [] })
    // @ts-ignore
    store.dispatch(fetchBooks("domain")).then(() => {
      expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/books?_sort=id&_order=asc&q=domain")
    })
  })
})
