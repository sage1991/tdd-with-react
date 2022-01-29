import { CaseReducer, PayloadAction } from "@reduxjs/toolkit"

import { StoreState } from "./slices"
import { Book } from "../../model"


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
