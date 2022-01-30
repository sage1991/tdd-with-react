import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

import { FETCH_BOOK_BY_ID, FETCH_BOOKS, SAVE_REVIEW, SET_SEARCH_KEYWORD } from "./type"
import { Book, Review } from "../../model"


export const setSearchKeyword = createAction<string>(SET_SEARCH_KEYWORD)

export const fetchBooks = createAsyncThunk<Book[], string>(FETCH_BOOKS, (query) => {
  return axios
    .get(`http://localhost:8080/books?_sort=id&_order=asc&q=${query}`)
    .then(response => response.data)
})

export const fetchBookById = createAsyncThunk<Book, number>(FETCH_BOOK_BY_ID, (id) => {
  return axios
    .get(`http://localhost:8080/books/${id}?_embed=reviews`)
    .then(response => response.data)
})

export const saveReview = createAsyncThunk<Review, Review>(SAVE_REVIEW, async (review) => {
  await axios.post(`http://localhost:8080/reviews`, review)
  return review
})
