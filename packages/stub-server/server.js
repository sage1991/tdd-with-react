const jsonServer = require("json-server")

const server = jsonServer.create()
const router = jsonServer.router("book.json")
const middlewares = jsonServer.defaults()

server.use((request, response, next) => {
  if (request.method === "DELETE" && request.query["_cleanup"]) {
    router.db.set("books", []).write()
    response.sendStatus(204)
    return
  }
  next()
})
server.use(middlewares)
server.use(router)

server.listen(8080, () => {
  console.log("JSON server is running at 8080")
})
