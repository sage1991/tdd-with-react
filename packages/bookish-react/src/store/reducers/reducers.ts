import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"

import { StoreState } from "./slices"
import { Book, Review } from "../../model"


export const setSearchKeywordReducer: CaseReducer<StoreState, PayloadAction<string>> = (state, action) => {
  state.keyword = action.payload
}

export const fetchBookPendingReducer: CaseReducer<StoreState> = (state) => {
  state.loading = true
  state.error = false
}

export const fetchBookFulfilledReducer: CaseReducer<StoreState, PayloadAction<Book[]>> = (state, action) => {
  state.loading = false
  state.error = false
  state.books = action.payload
}

export const fetchBookRejectedReducer: CaseReducer<StoreState> = (state) => {
  state.error = true
  state.loading = false
}

export const fetchBookByIdFulfilledReducer: CaseReducer<StoreState, PayloadAction<Book>> = (state, action) => {
  state.detail = action.payload
}

export const saveReviewFulfilledReducer: CaseReducer<StoreState, PayloadAction<Review>> = (state, action) => {
  const book = state.books.find((book) => book.id === action.payload.bookId)
  if (!book) return

  if (book.reviews) {
    book.reviews.push(action.payload)
  } else {
    book.reviews = [ action.payload ]
  }

  if (state.detail.id === book.id) {
    state.detail = book
  }
}
