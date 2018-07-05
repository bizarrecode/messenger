var mongoose = require("mongoose");
var User = require("../models/User");

var loginController = {};

loginController.login = function(req, res) {
    var userP = new User(req.body);
    User.findOne({username: userP.username}).exec(function (err, user) {
        if (err) {
            console.log("Error:", err);
        }else if(!user) {
            console.log("No user found.");
            res.redirect("/login");
        }else if(user.validPassword(userP.password)){
            res.redirect("/messages/show/"+user._id);
        }else{
            console.log("Wrong password.");
            res.redirect("/login");
        }
    });
};

module.exports = loginController;
