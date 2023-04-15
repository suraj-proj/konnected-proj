const express = require('express');
const bt_route = express();
const bt_controller = require('../controllers/btController');

bt_route.get("/", bt_controller.getBooks)
bt_route.get("/:level", bt_controller.getBooksByLevel)
bt_route.get("/:name/:id", bt_controller.getBook)
bt_route.post("/add-book", bt_controller.addBook)

module.exports = bt_route;