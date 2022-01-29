import { createSlice } from "@reduxjs/toolkit"

import {
  fetchBookRejectedReducer,
  fetchBookFulfilledReducer,
  fetchBookPendingReducer,
  setSearchKeywordReducer
} from "./reducers"
import { fetchBooks, setSearchKeyword } from "../actions"
import { Book } from "../../model"


export interface StoreState {
  loading: boolean
  error: boolean
  books: Book[]
  keyword: string
}

const initialState: StoreState = {
  loading: false,
  error: false,
  books: [],
  keyword: ""
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
  }
})

export const { reducer } = slice
