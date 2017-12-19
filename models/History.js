var mongoose = require('mongoose');

var HistorySchema = new mongoose.Schema({
	room_name: { type : String , required : true },
	sent: { type : String , required : true },
  	replies: { type : String , required : true },
  	message: { type : String , required : true },
  	updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('History', HistorySchema);