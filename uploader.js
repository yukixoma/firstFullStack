var fs = require("fs");

//Connect Mongodb database
var mongoose = require("mongoose");
var manga = require("./models/manga");
mongoose.connect("mongodb://yukixoma:123456789@ds046357.mlab.com:46357/manga");

//Connect Flickr api
var Flickr = require("flickrapi");
var FlickrOptions = {
    api_key: "38ebc1d666f2689fddcb2ba5207d4f4c",
    secret: "3da187d71147c1d6",
    user_id: "156158483@N06",
    access_token: "72157690262162532-08bb08678eea7160",
    access_token_secret: "6379fcc380397f98",
}
var api_key = "38ebc1d666f2689fddcb2ba5207d4f4c";

//Connect Imgur api
var imgur = require("imgur");
var clientID = ["cdfc0eef74ecfc9", "7f3eb97b787812d", "3e18908bb8d5a8f", "c08857d7784f570", "ec75d3f43886523", "360ec78c61b2d44"];



var imgurMultiFileUpload = (files, id, chapter, callback) => {
    var i = 0;
    var j = 0;
    var x = 0;
    var newChapter = [];
    var position;
    var error = [];
    var photos = [];
    var flickrId = [];
    files.forEach(e => {
        photos.push({
            title: "test",
            tags: ["test"],
            photo: e
        })
    });

    Flickr.authenticate(FlickrOptions, function (error, flickr) {
        var uploadOptions = {
            photos: photos
        };

        Flickr.upload(uploadOptions, FlickrOptions, function (err, result) {
            if (err) {
                callback(null, "Flickr upload is failed.");
            } else {
                callback("Flickr upload is done!", null);
            }
            flickrId = result;
            continueUpload(flickr);
        });
    });

    var continueUpload = flickr => {
        manga.findOne({ _id: id }, (err, data) => {
            if (err) callback(null, "ID not found");
            if (data) {
                newChapter = data.chapter;
                if (chapter) {
                    position = chapter;
                } else {
                    newChapter.push([[], [], []]);
                    position = newChapter.length - 1;
                }
                flickrMulti(flickr);
            }
        })
    }
    var flickrMulti = flickr => {
        if (x < flickrId.length) {
            flickr.photos.getSizes({ api_key: api_key, photo_id: flickrId[x] }, (err, res) => {
                x += 1;
                if (err) {
                    callback(null, "file " + x + " in Flickr is failed");
                    error.push("file " + x + " in Flickr is failed");
                }
                if (res) {
                    var data = res.sizes.size;
                    var original = data.filter(e => {
                        return e.label === "Original";
                    })
                    newChapter[position][1].push(original[0].source);
                    callback("file " + x + " is uploaded to Flickr database", null);
                }
                flickrMulti(flickr);
            })
        }
        if (x === flickrId.length) {
            if (error.length !== 0) callback(null, error);
            if (error.length === 0) {
                callback("Upload to Flickr is done", null);
                imgurMulti();
            }
            manga.findOneAndUpdate({ _id: id }, { $set: { chapter: newChapter } }, { new: true }, (err, doc, data) => {
                if (err) callback(null, "Database error");
                if (error.length !== 0) callback(null, error);
                if (error.length === 0) callback("Flickr is done!", null);
            })
        }
    }

    var imgurMulti = () => {
        if (j > 5) j = 0;
        imgur.setClientId(clientID[j]);
        j += 1;
        if (i < files.length) {
            imgur.uploadFile(files[i])
                .then(json => {
                    newChapter[position][0].push(json.data.link);
                    fs.unlink(files[i], err => {
                        if (err) callback(null, "error unlink file");
                    });
                    i += 1;
                    callback("file " + i + " is uploaded to imgur", null);
                    imgurMulti();
                })
                .catch(err => {
                    fs.unlink(files[i], err => {
                        if (err) callback(null, "error unlink file");
                    });
                    i += 1;
                    callback(null, "file " + i + " in imgur is failed");
                    error.push("file " + i + " in imgur is failed");
                    imgurMulti();
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


//Import link from blogger
var blogger = (href, id, position, callback) => {
    manga.findOne({ _id: id }, (err, data) => {
        if (err) callback(null, "ID not found");
        if (data && position === null) {
            newChapter = data.chapter;
            newChapter.push([[], [], href]);
            manga.findOneAndUpdate({ _id: id }, { $set: { chapter: newChapter } }, { new: true }, (err, doc, data) => {
                if (err) callback(null, "Database error");
                else callback("Blogger import all green", null);
            })
        }
        if (data && position !== null) {
            newChapter = data.chapter;
            newChapter[position][2] = href;
            manga.findOneAndUpdate({ _id: id }, { $set: { chapter: newChapter } }, { new: true }, (err, doc, data) => {
                if (err) callback(null, "Database error");
                else callback("Blogger import all green", null);
            })
        }
    })
}

module.exports.multiFile = imgurMultiFileUpload;
module.exports.single = imgurSingleFileUpload;
module.exports.blogger = blogger;