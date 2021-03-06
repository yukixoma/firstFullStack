var express = require("express");
var path = require("path");
var fs = require("fs");

//Get root path
var appDir = path.dirname(require.main.filename);

//App create
var app = express();

//Config static serving folder
app.use("/public", express.static(appDir + "/public"));

//multer handle file upload
var multer = require("multer");
var upload = multer({ dest: 'tmp/' });


//Connect to Uploader
var imgUploader = require("./uploader");


//body parser parse form data
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//webpack config: Build react,js,css file...in to 1 file bundle.js
var webpack = require("webpack");
var config = require("./webpack.config");
var compiler = webpack(config);
var webPackDev = require("webpack-dev-middleware");
var webpackHot = require("webpack-hot-middleware");
app.use(webPackDev(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}))
app.use(webpackHot(compiler));


//Connect to mongodb
var mongoose = require("mongoose");
var userModel = require("./models/user");
var manga = require("./models/manga");
var bookmark = require("./models/bookmark");
mongoose.connect("mongodb://yukixoma:123456789@ds046357.mlab.com:46357/manga");


//Config express route to let React router handle routing
var route = ["/", "/bookmark", "/new", "/register", "/detail/*", "/read/*", "/edit/*", "/add/*", "/list/*"];
app.get(route, (req, res) => {
    res.sendFile(appDir + "/index.html");
});


//Config express route to let Client fetch data
app.get("/fetchMangaList", (req, res) => {
    manga.find({}, (err, data) => {
        if (err) res.writeHead(500, "Database error");
        if (data) {
            res.send(data);
        }
    })
})

app.get("/fetchBookmarkList/:username", (req, res) => {
    let { username } = req.params;
    bookmark.findOne({ username: username }, (err, data) => {
        if (err) console.log(err);
        if (data) res.send(data.bookmarked);
    })
})


//Handle new manga request
app.post("/new", upload.single("file"), (req, res) => {
    let { username, password } = req.body;
    userModel.login(username, password, (data, err) => {
        if (err) res.writeHead(500, err);
        if (data) {
            imgUploader.single(req.file.path, (link, err) => {
                if (data) {
                    let { name, subName, author, group, description, status } = req.body;
                    var cover = link;
                    var genre = req.body.genre.split(", ");
                    var newManga = new manga({
                        name: name,
                        subName: subName,
                        cover: cover,
                        author: author,
                        group: group,
                        genre: genre,
                        description: description,
                        status: status,
                        username: username
                    });

                    newManga.save(err => {
                        if (err) throw err;
                        res.send(newManga._id);
                    })
                }
                else res.writeHead("500", "Internal error");
            })
        }
    })

});


//Handle edit manga info request 
app.post("/editMangaInfo", upload.single("file"), (req, res) => {
    let { username, password, id, name, subName, author, group, description, status } = req.body;
    var cover = "";
    let genre = req.body.genre.split(", ");
    userModel.login(username, password, (data, err) => {
        if (err) res.writeHead(500, err);
        if (data) {
            if (req.file) {
                imgUploader.single(req.file.path, (link, err) => {
                    if (err) res.writeHead(500, "Internal Error");
                    if (link) {
                        console.log(link);
                        cover = link;
                        update(id, name, subName, cover, author, group, genre, description, status);
                        res.send("Manga info updated");
                    }
                })
            } else {
                update(id, name, subName, cover, author, group, genre, description, status);
                res.send("Manga info updated");
            }
        }
    })

    function update(id, name, subName, cover, author, group, genre, description, status) {
        var set = {
            name: name,
            subName: subName,
            author: author,
            group: group,
            genre: genre,
            description: description,
            status: status
        }
        if (cover) set.cover = cover;
        manga.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: set
            },
            {
                new: true
            },
            (err, doc, data) => {
                if (err) console.log(err);
            })
    }
})


//Handle new chapter request
app.post("/chap/new/:id", upload.array("files"), (req, res) => {
    let { username, password, href } = req.body;
    let { id } = req.params;
    userModel.login(username, password, (data, err) => {
        if (data) {
            res.send("Server recieved files");
            if (href) {
                imgUploader.blogger(href, id, null, (res, err) => {
                    if (err) console.log(err);
                    else console.log(res);
                })
            } else {
                var files = [];
                req.files.map((file, index) => {
                    files.push(file.path);
                })
                imgUploader.multiFile(files, id, null, (data, err) => {
                    if (err) console.log(err);
                    if (data) console.log(data);
                })
            }
        }
        else {
            res.writeHead(401, err);
            req.files.forEach(e => fs.unlink(e.path));
        }
    })
})

//Handle add Img to chapter request
app.post("/chapter/add/:id/:chapter", upload.array("files"), (req, res) => {
    let { chapter, id } = req.params;
    var { imgIndex, href } = req.body;
    res.send("Chapter is edited");
    var files = [];
    if (req.files) {
        req.files.map((file, index) => {
            files.push(file.path);
        })
    }
    var newChapter = [];
    manga.findOne({ _id: id }, (err, data) => {
        if (err) console.log(err);
        if (data) {
            newChapter = data.chapter;
        }
    })
    if (imgIndex) {
        imgUploader.single(files[0], (link, err) => {
            if (err) console.log(err);
            if (link) {
                newChapter[chapter][0].splice(imgIndex, 0, link);
                manga.findOneAndUpdate({ _id: id }, { $set: { chapter: newChapter } }, { new: true }, (err, doc, data) => {
                    if (err) console.log(err);
                })
            }
        })
    } else if (href) {
        imgUploader.blogger(href, id, chapter, (data, err) => {
            if (err) console.log(err);
            if (data) console.log(data);
        })
    } else {
        imgUploader.multiFile(files, id, chapter, (data, err) => {
            if (err) console.log(err);
            if (data) console.log(data);
        })
    }

})



//Handle Manga delete request 
app.post("/remove/manga/:id", (req, res) => {
    var id = req.params.id;
    var username = req.body.username;
    var password = req.body.password;
    userModel.login(username, password, (data, err) => {
        if (err) throw err;
        if (data) {
            manga.findOneAndRemove({ _id: id }, (err, result) => {
                if (err) throw err;
                manga.find({}, (err, data) => {
                    if (err) throw err;
                    res.send(data);
                })
            })
        }
    })
})


//Handle Sign-up request 
app.post("/register", (req, res) => {
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    userModel.register(username, password, (data, err) => {
        if (data) res.send(data);
        else res.send(err);
    })
})

//Handle Log-in request
app.post("/login", (req, res) => {
    let { username, password } = req.body;
    userModel.login(username, password, (data, err) => {
        if (err) res.sendStatus(401);
        if (data) {
            res.send(data);
        }
    })
})

//Handle bookmark request 
app.post("/bookmark", (req, res) => {
    let { id, username, password, updatedAt, isBookmarked } = req.body;
    userModel.login(username, password, (data, err) => {
        if (err) res.sendStatus(401);
        if (data) {
            bookmark.findOne({ username: username }, (err, data) => {
                if (err) res.sendStatus(500);
                if (data) {
                    if (isBookmarked) {
                        data.bookmarked.push({
                            id,
                            updatedAt
                        })
                    } else {
                        data.bookmarked = data.bookmarked.filter(e => {
                            return e.id != id;
                        })
                    }
                    data.save(err => {
                        if (err) res.sendStatus(500);
                        else res.send(data.bookmarked);
                    })
                }
            })
        }
    })
})

//Handle bookmarked manga readed 
app.get("/bookmark/:id/:username", (req, res) => {
    let { id, username } = req.params;
    bookmark.findOne({ username: username }, (err, data) => {
        if (err) res.sendStatus(500);
        if (data) {
            let { bookmarked } = data;
            for (let i = 0; i < bookmarked.length; i++) {
                if (bookmarked[i]["id"] === id) {
                    let today = new Date();
                    bookmarked[i]["updatedAt"] = today.toISOString();
                }
            }
            bookmark.findOneAndUpdate({ username: username }, { $set: { bookmarked: bookmarked } }, { new: true }, (err, data) => {
                if (err) res.sendStatus(500);
                else res.send(data.bookmarked);
            });
        }
    })
})




app.post("/test", upload.array("files"), (req, res) => {
    res.send("Server recieved files");
    req.files.map((file, index) => {
        fs.unlink(file.path, err => {
            if (err) res.send(err);
        })
    })
})


app.listen(process.env.PORT || 3000);