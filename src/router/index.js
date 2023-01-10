const {
  addNote,
  getAllNotes,
  getNoteById,
  editNote,
  deleteNote,
} = require("../controller/controller");

const routes = [
  {
    method: "POST",
    path: "/notes",
    handler: addNote,
    options: {
      cors: {
        origin: ["*"],
      },
    },
  },
  {
    method: "GET",
    path: "/notes",
    handler: getAllNotes,
  },
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getNoteById,
  },
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: editNote,
  },
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNote,
  },
];

module.exports = routes;
