var express = require('express');
var router = express.Router();
var registry = require("../controllers/RegistryController.js");

router.get('/', function(req, res) {
	registry.create(req, res);
});

router.post('/save', function(req, res) {
	registry.save(req, res);
});

module.exports = router;
