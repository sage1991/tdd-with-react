import React, { FC, useEffect } from "react"
import { useParams } from "react-router-dom"

import { createBookDetailSelector, fetchBookById, useDispatch, useSelector } from "../../store"
import { BookDetail } from "../../components"


const bookDetailSelector = createBookDetailSelector()

export const BookDetailContainer: FC = () => {
  const params = useParams<{ id: string }>()
  const dispatch = useDispatch()

  useEffect(() => {
    if (params.id) {
      dispatch(fetchBookById(parseInt(params.id)))
    }
  }, [ params.id ])

  const { book, loading, error } = useSelector(bookDetailSelector)

  return <BookDetail book={book} />
}
