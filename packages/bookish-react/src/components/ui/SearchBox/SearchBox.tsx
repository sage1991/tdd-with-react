import React, { FC } from "react"
import { TextField, TextFieldProps } from "@mui/material"


export const SearchBox: FC<TextFieldProps> = (props) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.trim()) {
      props.onChange && props.onChange(e)
    }
  }
  return <TextField {...props} onChange={onChange} />
}
