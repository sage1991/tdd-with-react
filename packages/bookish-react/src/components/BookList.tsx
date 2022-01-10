import React, { FC } from "react"


interface Props {
  items: { name: string }[]
}

export const BookList: FC<Props> = (props) => {
  return (
    <div data-test="book-list">
      {
        props.items.map((book, index) => (
          <div key={index} className="book-item">
            <h2 className="title">{book.name}</h2>
          </div>
        ))
      }
    </div>
  )
}
