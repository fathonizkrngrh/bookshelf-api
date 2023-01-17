const {
  addBook,
  getAllBooks,
  getBookById,
  editBook,
  deleteBook,
} = require("../controller/controller");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBook,
    options: {
      cors: {
        origin: ["*"],
      },
    },
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooks,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBookById,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: editBook,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBook,
  },
];

module.exports = routes;
