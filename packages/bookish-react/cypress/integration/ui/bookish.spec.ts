import axios from "axios"

import { Book } from "../../../src/model"


describe("Bookish application", () => {
  before(() => axios.delete("http://localhost:8080/books?_cleanup=true").catch(console.error))

  afterEach(() => axios.delete("http://localhost:8080/books?_cleanup=true").catch(console.error))

  beforeEach(() => {
    const books: Book[] = [
      {
        id: 1,
        name: "Refactoring",
        description: "Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software."
      },
      {
        id: 2,
        name: "Domain-driven design",
        description: "Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software."
      },
      {
        id: 3,
        name: "Building Microservices",
        description: "Martin Fowler's Refactoring defined core ideas and techniques that hundreds of thousands of developers have used to improve their software."
      }
    ]

    return books.map(book => (
      axios.request({
        url: "http://localhost:8080/books",
        method: "POST",
        data: book,
        headers: { "Content-Type": "application/json" }
      }).catch(console.error)
    ))
  })

  it("should visits the bookish", () => {
    cy.visit("http://localhost:3000")
    cy.get("h2[data-test='heading']").contains("Bookish")
  })

  it("should shows a book list", () => {
    cy.visit("http://localhost:3000")
    cy.get("div[data-test='book-list']").should("exist")
    cy.get("div.book-item").should("have.length", 3)
    cy.get("div.book-item").should((books) => {
      expect(books).to.have.length(3)
      const titles = Array.prototype.map.call(books, (book: HTMLElement) => book.querySelector("h2").innerHTML)
      expect(titles).to.deep.equal([ "Refactoring", "Domain-driven design", "Building Microservices" ])
    })
  })

  it("should goes to the detail page", () => {
    cy.visit("http://localhost:3000")
    cy.get("div.book-item").contains("View Details").eq(0).click()
    cy.url().should("include", "/books/1")
    cy.get("h2.book-title").contains("Refactoring")
  })
})

