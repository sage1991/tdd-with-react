import axios from "axios"

import { store } from "./store"
import { Book, Review } from "../model"
import { fetchBookById, fetchBooks, saveReview, setSearchKeyword } from "./actions"


describe("Store", () => {
  const books: Book[] = [
    { id: 1, name: "Refactoring", description: "description" },
    { id: 2, name: "Domain-driven design", description: "description" }
  ]

  it("should fetch books from remote", async () => {
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }))

    await store.dispatch(fetchBooks("")).unwrap()
    const state = store.getState()
    expect(state.books.length).toEqual(books.length)
    expect(state.books).toEqual(books)
  })

  it("should performs a search", async () => {
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }))

    store.dispatch(setSearchKeyword("domain"))
    const { keyword } = store.getState()
    await store.dispatch(fetchBooks(keyword)).unwrap()

    expect(keyword).toEqual("domain")
    expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/books?_sort=id&_order=asc&q=domain")
  })

  it("should fetch book from remote", async () => {
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books[0] }))

    await store.dispatch(fetchBookById(1)).unwrap()
    const { detail } = store.getState()
    expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/books/1?_embed=reviews")
    expect(detail).toEqual(books[0])
  })

  it("should save review", async () => {
    axios.get = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: books }))
    axios.post = jest
      .fn()
      .mockImplementation(() => Promise.resolve())

    const review: Review = {
      id: 1,
      bookId: 1,
      name: "Harry",
      content: "Very useful!!",
      date: ""
    }

    await store.dispatch(fetchBooks("")).unwrap()
    await store.dispatch(saveReview(review)).unwrap()
    const state = store.getState()
    const book = state.books.find(book => book.id === review.bookId)

    expect(axios.post).toHaveBeenCalledWith("http://localhost:8080/reviews", review)
    expect(book).not.toBeNull()
    expect(book?.reviews).toContain(review)
  })
})
