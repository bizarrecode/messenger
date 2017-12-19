var mongoose = require('mongoose');

var RoomSchema = new mongoose.Schema({
	room_name: { type : String , unique : true, required : true },
  	updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Room', RoomSchema);