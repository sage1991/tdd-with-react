import React, { FC } from "react"
import { Typography } from "@mui/material"
import { Routes, Route, Navigate } from "react-router-dom"

import { BookListContainer, BookDetailContainer } from "./container"


export const App: FC = () => {
  return (
    <>
      <Typography
        variant="h2"
        component="h2"
        data-test="heading"
      >
        Bookish
      </Typography>
      <Routes>
        <Route path="/" element={<BookListContainer />} />
        <Route path="books/:id" element={<BookDetailContainer />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
