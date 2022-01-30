import React from "react"
import { render } from "@testing-library/react"

import { ReviewList } from "./ReviewList"


describe("ReviewList", () => {
  it("should renders an empty list", () => {
    const props = {
      reviews: []
    }

    const { container } = render(<ReviewList {...props} />)
    const reviews = container.querySelector("div[data-test='review-container']")

    expect(reviews).toBeInTheDocument()
  })

  it("should renders a list when data is passed", () => {
    const props = {
      reviews: [
        { id: 1, name: "Juntao", date: "2018/06/21", content: "Excellent work, really impressed by your efforts", bookId: 1 },
        { id: 2, name: "Abruzzi", date: "2018/06/22", content: "What a great book", bookId: 1 }
      ]
    }

    const { container } = render(<ReviewList {...props} />)
    const reviews = container.querySelectorAll("div[data-test='review-container'] [data-test='review']")

    expect(reviews.length).toBe(2)
    expect(reviews[0].innerHTML).toEqual("Juntao")
    expect(reviews[1].innerHTML).toEqual("Abruzzi")
  })
})
