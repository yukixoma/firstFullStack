
var mongoose    = require("mongoose");
var Schema      = mongoose.Schema;

var mangaSchema = newSchema ({
    name:           String,
    subName:        String,
    cover:          String,
    author:         String,
    group:          String,
    genre:          Array,
    description:    String,
    status:         String
},{timestamps: true});

var ModelClass = mongoose.model("manga",mangaSchema);
module.exports = ModelClass;