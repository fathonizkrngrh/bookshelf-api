const books = require("../books");
const { nanoid } = require("nanoid");
const { StatusCodes: status } = require("http-status-codes");

module.exports = {
  addBook: (req, h) => {
    try {
      const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
      } = req.payload;

      if (!name) {
        const response = h.response({
          status: "fail",
          message: "Gagal menambahkan buku. Mohon isi nama buku",
        });
        response.code(status.BAD_REQUEST);
        return response;
      }

      if (readPage > pageCount) {
        const response = h.response({
          status: "fail",
          message:
            "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(status.BAD_REQUEST);
        return response;
      }

      const id = nanoid(8);
      const insertedAt = new Date().toISOString();
      const updatedAt = insertedAt;
      let finished = false;
      if (pageCount === readPage) {
        finished = true;
      }

      const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
      };

      books.push(newBook);

      const response = h.response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
          bookId: newBook.id,
        },
      });
      response.code(status.CREATED);
      return response;
    } catch (error) {
      console.log(error);
      const response = h.response({
        status: "error",
        message: "Buku gagal ditambahkan",
      });
      response.code(status.INTERNAL_SERVER_ERROR);
      return response;
    }
  },
  getAllBooks: () => {
    let filteredBooks = [];

    books.forEach((book) => {
      let finalBook = {};
      finalBook.id = book.id;
      finalBook.name = book.name;
      finalBook.publisher = book.publisher;

      filteredBooks.push(finalBook);
    });
    return {
      status: "success",
      data: {
        books: filteredBooks,
      },
    };
  },
  getBookById: (req, h) => {
    const { id } = req.params;
    const book = books.filter((n) => n.id === id)[0];
    if (!book) {
      const response = h.response({
        status: "fail",
        message: "Buku tidak ditemukan",
      });
      response.code(status.NOT_FOUND);
      return response;
    }
    return {
      status: "success",
      data: {
        book,
      },
    };
  },
  editBook: (req, h) => {
    const { id } = req.params;
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = req.payload;

    if (!name) {
      const response = h.response({
        status: "fail",
        message: "Gagal menambahkan buku. Mohon isi nama buku",
      });
      response.code(status.BAD_REQUEST);
      return response;
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: "fail",
        message:
          "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      });
      response.code(status.BAD_REQUEST);
      return response;
    }

    const updatedAt = new Date().toISOString();

    const index = books.findIndex((book) => book.id === id);
    if (index !== -1) {
      books[index] = {
        ...books[index],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt,
      };
      const response = h.response({
        status: "success",
        message: "Buku berhasil diperbarui",
      });
      response.code(status.OK);
      return response;
    }

    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(status.NOT_FOUND);
    return response;
  },
  deleteBook: (req, h) => {
    const { id } = req.params;

    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
      books.splice(index, 1);
      const response = h.response({
        status: "success",
        message: "Buku berhasil dihapus",
      });
      response.code(status.OK);
      return response;
    }
    const response = h.response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    });
    response.code(status.NOT_FOUND);
    return response;
  },
};
