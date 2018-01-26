
var mongoose    = require("mongoose");
var Schema      = mongoose.Schema;

var mangaSchema = new Schema ({
    name:           String,
    subName:        String,
    cover:          String,
    author:         String,
    group:          String,
    genre:          Array,
    description:    String,
    status:         String,
    username:       String,
    chapter:        Array
},{timestamps: true});

var ModelClass = mongoose.model("manga",mangaSchema);
module.exports = ModelClass;