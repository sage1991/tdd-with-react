import React, { FC } from "react"

import { Book } from "../../model"


interface Props {
  book: Book
}

export const BookDetail: FC<Props> = (props) => {
  return (
    <div className="detail">
      <h2 className="book-title">{props.book.name}</h2>
      <p className="book-description">{props.book.description ?? props.book.name}</p>
    </div>
  )
}
