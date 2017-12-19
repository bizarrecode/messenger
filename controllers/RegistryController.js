var mongoose = require("mongoose");
var User = require("../models/User");

var registryController = {};

registryController.create = function(req, res) {
    res.render("../views/registry");
};

registryController.save = function(req, res) {
    var userS = new User(req.body);
    userS.password = userS.generateHash(userS.password);
    User.findOne({username: userS.username}).exec(function (err, user) {
        if (err) {
            console.log("Error:", err);
        }else if(user) {
            console.log("User "+userS.username+" is already.");
            res.redirect("/registry");
        }else{
            userS.save(function(err) {
                if(err) {
                    console.log(err);
                    res.redirect("/registry");
                } else {
                    console.log("Successfully created an user.");
                    res.redirect("/login");
                }
            });
        }
    });
};

module.exports = registryController;
