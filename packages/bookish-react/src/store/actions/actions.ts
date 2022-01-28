import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

import { FETCH_BOOKS, SET_SEARCH_KEYWORD } from "./type"
import { Book } from "../../model"


export const setSearchKeyword = createAction<string>(SET_SEARCH_KEYWORD)

export const fetchBooks = createAsyncThunk<Book[], string>(FETCH_BOOKS, (query: string) => {
  return axios
    .get(`http://localhost:8080/books?_sort=id&_order=asc&q=${query}`)
    .then(response => response.data)
})
