import React, { FC } from "react"
import { Typography } from "@mui/material"
import { BookList } from "./components/BookList"


export const App: FC = (props) => {
  const books = [
    { name: "Refactoring" },
    { name: "Domain-driven design" }
  ]

  return (
    <div>
      <Typography variant="h2" component="h2" data-test="heading">
        Bookish
      </Typography>
      <BookList items={books} />
    </div>
  )
}
