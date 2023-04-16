const express = require('express');
const topic_route = express();
const topic_controller = require('../controllers/topicController');

topic_route.get("/:bid", topic_controller.getTopics)
// topic_route.get("/:bname/:id", topic_controller.getBook)
// topic_route.post("/add-topic", topic_controller.addTopic)

module.exports = topic_route;