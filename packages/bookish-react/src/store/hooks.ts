import { useDispatch as useReactReduxDispatch, useSelector as useReactReduxSelector } from "react-redux"

import { RootDispatch, RootState } from "./store"


export const useSelector = <Selected> (
  selector: (state: RootState) => Selected,
  equalityFn?: (left: Selected, right: Selected) => boolean
) => useReactReduxSelector(selector, equalityFn)

export const useDispatch = (): RootDispatch => useReactReduxDispatch()
