import { createSelector } from "@reduxjs/toolkit"

import { StoreState } from "../reducers"


export const createBookListSelector = () => createSelector(
  (state: StoreState) => state.books,
  (state: StoreState) => state.loading,
  (state: StoreState) => state.error,
  (books, loading, error) => ({ books, loading, error })
)

export const createSearchKeywordSelector = () => createSelector(
  (state: StoreState) => state.keyword,
  (keyword) => keyword
)

export const createBookDetailSelector = () => createSelector(
  (state: StoreState) => state.detail,
  (state: StoreState) => state.loading,
  (state: StoreState) => state.error,
  (book, loading, error) => ({ book, loading, error })
)
