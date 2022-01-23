import React, { FC } from "react"
import axios from "axios"

import { BookList } from "../../components"
import { useRemoteService } from "../../hooks"
import { Book } from "../../model"


const INITIAL_BOOKS: Book[] = []

const fetchBooks = (): Promise<Book[]> => (
  axios
    .get("http://localhost:8080/books?_sort=id&_order=asc")
    .then(response => response.data)
)

export const BookListContainer: FC = () => {
  const { data, loading, error } = useRemoteService(fetchBooks, INITIAL_BOOKS, [])
  return <BookList items={data} loading={loading} error={error} />
}
