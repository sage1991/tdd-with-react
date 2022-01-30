import axios from "axios"

describe("Bookish application", () => {
  const visitApp = () => cy.visit("http://localhost:3000")

  afterEach(() => {
    return (
      axios
        .get("http://localhost:8080/reviews")
        .then(({ data }) => {
          return Promise.all(data.map(review => axios.delete(`http://localhost:8080/reviews/${review.id}`)))
        })
    )
  })

  it("should visits the bookish", () => {
    visitApp()
    cy.get("h2[data-test='heading']").contains("Bookish")
  })

  it("should shows a book list", () => {
    visitApp()
    cy.get("div[data-test='book-list']").should("exist")
    cy.get("div[data-test='book-item']").should("have.length", 4)
    cy.get("div[data-test='book-item']").should((books) => {
      expect(books).to.have.length(4)
      const titles = Array.prototype.map.call(books, (book: HTMLElement) => book.querySelector("h2").innerHTML)
      expect(titles).to.deep.equal([
        "Refactoring",
        "Domain-driven design",
        "Building Microservices",
        "Acceptance Test Driven Development with React"
      ])
    })
  })

  it("should goes to the detail page", () => {
    visitApp()
    cy.get("div[data-test='book-item']").contains("View Details").eq(0).click()
    cy.url().should("include", "/books/1")
    cy.get("h2.book-title").contains("Refactoring")
  })

  it("should searches for a title", () => {
    visitApp()
    cy.get("div[data-test='book-item']").should("have.length", 4)
    cy.get("div[data-test='search'] input").type("design")
    cy.get("div[data-test='book-item']").should("have.length", 1)
    cy.get("div[data-test='book-item']").eq(0).contains("Domain-driven design")
  })

  it("should write a review for a book", () => {
    visitApp()
    cy.get("div[data-test='book-item']").contains("View Details").eq(0).click()
    cy.get("input[name='name']").type("Harry")
    cy.get("textarea[name='content']").type("Excellent work!!")
    cy.get("button[name='submit']").click()
    cy.get("div[data-test='review-container'] [data-test='review']").should("have.length", 1)
  })
})
