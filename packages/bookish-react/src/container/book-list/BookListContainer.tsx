import React, { FC, useEffect } from "react"

import { BookList, SearchBox } from "../../components"
import {
  useDispatch,
  useSelector,
  createBookListSelector,
  createSearchKeywordSelector,
  fetchBooks,
  setSearchKeyword
} from "../../store"


const bookListSelector = createBookListSelector()
const searchKeywordSelector = createSearchKeywordSelector()

export const BookListContainer: FC = () => {
  const dispatch = useDispatch()
  const keyword = useSelector(searchKeywordSelector)
  const { books, loading, error } = useSelector(bookListSelector)

  useEffect(() => {
    dispatch(fetchBooks(keyword))
  }, [ keyword, dispatch ])

  const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setSearchKeyword(e.target.value))

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
      <BookList items={books} loading={loading} error={error} />
    </>
  )
}
