import React, { FC } from "react"
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography
} from "@mui/material"

import { Book } from "../../model"
import { Link } from "react-router-dom"


interface Props {
  items: Book[]
  loading: boolean
  error: boolean
}

export const BookList: FC<Props> = (props) => {
  if (props.loading) {
    return <p>Loading...</p>
  }

  if (props.error) {
    return <p>Error...</p>
  }

  const renderBookList = () => props.items.map(book => (
    <Grid key={book.id} xs={4} sm={4} className="book-item">
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className="title"
            >
              {book.name}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="p"
              color="textSecondary"
              className="description"
            >
              {book.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            <Link to={`/books/${book.id}`}>View Details</Link>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  ))

  return (
    <div data-test="book-list">
      <Grid container spacing={3}>
        { renderBookList() }
      </Grid>
    </div>
  )
}
