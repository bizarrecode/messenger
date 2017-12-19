var mongoose = require("mongoose");
var History = require("../models/History");
var Room = require("../models/Room");
var User = require("../models/User");

var messageController = {};

messageController.show = function(req, res) {
    User.findOne({_id: req.params.id}).exec(function (err, user) {
        if (err) {
            console.log("Error:", err);
        }else {
            res.render("../views/message", {user: user});
        }
    });
};

messageController.contact = function(req, res) {
    User.find({ username: { $ne: req.body.username } }).exec(function (err, users) {
        if (err) {
            console.log("Error:", err);
        }else {
            for (i in users){
                users[i].password = null;
            }
            res.send(users);
        }
    });
};

messageController.history = function(req, res) {
    Room.findOne({ $or: [ { room_name: (req.body.sent_id + req.body.replies_id) }, { room_name: (req.body.replies_id + req.body.sent_id) } ] }).exec(function (err, room) {
        if (err) {
            console.log("Error:", err);
        }else {
            var data = {};  
            if(!room){
                var roomP = new Room();
                roomP.room_name = req.body.sent_id + req.body.replies_id;
                roomP.save(function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("Successfully created a room.");
                        data.room_name = roomP.room_name;  
                    }
                });
            }else{
                data.room_name = room.room_name;
            }
            User.findOne({_id: req.body.replies_id}).exec(function (err, user) {
                if (err) {
                    console.log("Error:", err);
                }else {
                    data.replies_name = user.username; 
                    History.find({ room_name: data.room_name }).sort({updated_at: 'asc'}).exec(function (err, histories) {
                        if (err) {
                            console.log("Error:", err);
                        }else {
                            data.history = histories;
                            res.send(data);
                        }
                    });
                }
            });
        }
    });
    
};

messageController.save = function(req, res) {
    var history = new History();
    history.room_name = req.body.room_name;
    history.sent = req.body.sent_id;
    history.replies = req.body.replies_id;
    history.message = req.body.message;
    history.save(function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Successfully save message.");
            var data = {};  
            data.success = true;
            res.send(data);
        }
    });
};

module.exports = messageController;
