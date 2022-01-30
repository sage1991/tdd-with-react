import { createSlice } from "@reduxjs/toolkit"

import {
  fetchBookRejectedReducer,
  fetchBookFulfilledReducer,
  fetchBookPendingReducer,
  setSearchKeywordReducer,
  fetchBookByIdFulfilledReducer, saveReviewFulfilledReducer
} from "./reducers"
import { fetchBookById, fetchBooks, saveReview, setSearchKeyword } from "../actions"
import { Book } from "../../model"


export interface StoreState {
  loading: boolean
  error: boolean
  books: Book[]
  keyword: string
  detail: Book
}

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

const slice = createSlice({
  name: "book",
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBooks.pending, fetchBookPendingReducer)
      .addCase(fetchBooks.rejected, fetchBookRejectedReducer)
      .addCase(fetchBooks.fulfilled, fetchBookFulfilledReducer)
      .addCase(setSearchKeyword.type, setSearchKeywordReducer)
      .addCase(fetchBookById.fulfilled, fetchBookByIdFulfilledReducer)
      .addCase(saveReview.fulfilled, saveReviewFulfilledReducer)
  }
})

export const { reducer } = slice
