import React, { FC } from "react"
import { Typography } from "@mui/material"

export const App: FC = (props) => {
  return (
    <div>
      <Typography variant="h2" component="h2" data-test="heading">
        Bookish
      </Typography>
    </div>
  )
}
