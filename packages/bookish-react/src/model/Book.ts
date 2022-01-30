import { Review } from "./Review"


export interface Book {
  id: number
  name: string
  description?: string
  reviews?: Review[]
}
