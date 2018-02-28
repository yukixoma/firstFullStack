var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bookmarkSchema = new Schema({
    username: String,
    bookmarked: []
}, { timestamps: false });

var ModelClass = mongoose.model("bookmark", bookmarkSchema);
module.exports = ModelClass;