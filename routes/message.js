var express = require('express');
var router = express.Router();
var message = require("../controllers/MessageController.js");

router.get('/show/:id', function(req, res) {
	message.show(req, res);
});

router.get('/contacts/:username', function(req, res) {
	message.contact(req, res);
});

router.get('/histories/:sent_id/:replies_id', function(req, res) {
	message.history(req, res);
});

router.post('/save', function(req, res) {
	message.save(req, res);
});

module.exports = router;