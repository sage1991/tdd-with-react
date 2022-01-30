import React, { FC, useState } from "react"
import { Button, TextField } from "@mui/material"

import { Book } from "../../model"
import { ReviewList } from "../review-list"
import { saveReview, useDispatch } from "../../store"


interface Props {
  book: Book
}

export const BookDetail: FC<Props> = (props) => {
  const dispatch = useDispatch()
  const [ name, setName ] = useState<string>("")
  const [ content, setContent ] = useState<string>("")

  const onTextFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.name === "name") {
      setName(e.target.value)
    } else {
      setContent(e.target.value)
    }
  }

  const onSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(saveReview({
      name,
      content,
      id: Date.now(),
      date: new Date().toISOString(),
      bookId: props.book.id
    }))
  }

  return (
    <div className="detail">
      <h2 className="book-title">{props.book.name}</h2>
      <p className="book-description">{props.book.description ?? props.book.name}</p>
      <form noValidate autoComplete="off">
        <TextField
          label="Name"
          name="name"
          margin="normal"
          variant="outlined"
          value={name}
          onChange={onTextFieldChange}
        />
        <TextField
          label="Content"
          name="content"
          margin="normal"
          variant="outlined"
          multiline
          maxRows="4"
          value={content}
          onChange={onTextFieldChange}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          name="submit"
          onClick={onSubmitClick}
        >
          Submit
        </Button>
      </form>
      { props.book.reviews && <ReviewList reviews={props.book.reviews} /> }
    </div>
  )
}
