import React, { FC, useState } from "react"
import axios from "axios"

import { Book } from "../../model"
import { BookList } from "../../components"
import { useRemoteService } from "../../hooks"
import { SearchBox } from "../../components/ui"


const INITIAL_BOOKS: Book[] = []

const fetchBooks = (query: string) => (): Promise<Book[]> => (
  axios
    .get(`http://localhost:8080/books?_sort=id&_order=asc&q=${query}`)
    .then(response => response.data)
)

export const BookListContainer: FC = () => {
  const [ keyword, setKeyword ] = useState<string>("")
  const { data, loading, error } = useRemoteService(fetchBooks(keyword), INITIAL_BOOKS, [ keyword ])

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)

  return (
    <>
      <SearchBox
        label="Search"
        value={keyword}
        data-test="search"
        onChange={onTextChange}
        margin="normal"
        variant="outlined"
      />
      <BookList items={data} loading={loading} error={error} />
    </>
  )
}
