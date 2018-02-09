var fs = require("fs");
var imgur = require("imgur");
var mongoose = require("mongoose");
var manga = require("./models/manga");
var clientID = ["cdfc0eef74ecfc9", "7f3eb97b787812d", "3e18908bb8d5a8f", "c08857d7784f570", "ec75d3f43886523", "360ec78c61b2d44"];
mongoose.connect("mongodb://yukixoma:123456789@ds046357.mlab.com:46357/manga");



var imgurMultiFileUpload = (files, id, option, callback) => {
    var i = 0;
    var j = 0;
    var error = [];
    manga.findOne({ _id: id }, (err, data) => {
        if (err) callback(null, "ID not found");
        if (data) {
            var newChapter = data.chapter;
            if (!option) newChapter.push([[], [], []]);
            uploadMulti(newChapter);
        }
    })
    var uploadMulti = (newChapter) => {
        if (j > 5) j = 0;
        imgur.setClientId(clientID[j]);
        j += 1;
        if (i < files.length) {
            imgur.uploadFile(files[i])
                .then(json => {
                    var length = newChapter.length;
                    newChapter[length - 1][0].push(json.data.link);
                    fs.unlink(files[i])
                    i += 1;
                    callback("file " + i + " is uploaded", null);
                    uploadMulti(newChapter);
                })
                .catch(err => {
                    fs.unlink(files[i]);
                    i += 1;
                    callback(null, "file " + i + " is failed");
                    error.push("files " + i + " is failed");
                    uploadMulti(newChapter);
                });
        }
        if (i === files.length) {
            manga.findOneAndUpdate({ _id: id }, { $set: { chapter: newChapter } }, { new: true }, (err, doc, data) => {
                if (err) callback(null, "Database error");
                if (error.length !== 0) callback(null, error);
                if (error.length === 0) callback("All green", null);

            })
        }
    }
}

var imgurSingleFileUpload = (file, callback) => {
    imgur.uploadFile(file)
        .then(json => { 
            callback(json.data.link, null);
            fs.unlink(file); 
        })
        .catch(err => { 
            callback(null, err); 
            fs.unlink(file);
        });
}


module.exports.multiFile = imgurMultiFileUpload;
module.exports.single = imgurSingleFileUpload;