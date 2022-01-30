import React, { FC } from "react"
import { Review } from "../../model"


interface Props {
  reviews: Review[]
}

export const ReviewList: FC<Props> = (props) => {
  const renderReviews = () => props.reviews.map((review) => (
    <div key={review.id} data-test="review">
      { review.name }
    </div>
  ))

  return (
    <div data-test="review-container">
      { renderReviews() }
    </div>
  )
}
