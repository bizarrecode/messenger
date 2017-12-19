var express = require('express');
var router = express.Router();
var message = require("../controllers/MessageController.js");

router.get('/:id', function(req, res) {
	message.show(req, res);
});

router.post('/contact', function(req, res) {
	message.contact(req, res);
});

router.post('/history', function(req, res) {
	message.history(req, res);
});

router.post('/save', function(req, res) {
	message.save(req, res);
});

module.exports = router;