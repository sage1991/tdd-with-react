import React, { FC } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

import { BookDetail } from "../../components"
import { useRemoteService } from "../../hooks"
import { Book } from "../../model"


const INITIAL_BOOK: Book = {
  id: -1,
  name: "",
  description: ""
}

const fetchBookById = (id: number) => (): Promise<Book> => (
  axios
    .get(`http://localhost:8080/books/${id}`)
    .then(response => response.data)
)

export const BookDetailContainer: FC = () => {
  const params = useParams<{ id: string }>()
  const { data, loading, error } = useRemoteService(fetchBookById(+`${params.id}`), INITIAL_BOOK, [params.id])

  return <BookDetail book={data} />
}
