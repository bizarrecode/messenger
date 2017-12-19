var express = require('express');
var router = express.Router();
var login = require("../controllers/LoginController.js");

router.get('/', function(req, res) {
	res.redirect("/login");
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/login', function(req, res) {
	login.login(req, res);
});

module.exports = router;