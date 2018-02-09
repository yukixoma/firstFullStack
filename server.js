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
var imgurUpload = require("./uploader");


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
mongoose.connect("mongodb://yukixoma:123456789@ds046357.mlab.com:46357/manga");


//Config express route to let React router handle routing
var route = ["/", "/new", "/register", "/detail/*", "/read/*", "/edit/*", "/add/*", "/list/*"];
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


//Handle new manga request
app.post("/new", upload.single("file"), (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    userModel.login(username, password, (data, err) => {
        if (err) res.writeHead(500, err);
        if (data) {
            imgurUpload.single(req.file.path, (link, err) => {
                if (data) {
                    var name = req.body.name;
                    var subName = req.body.subName;
                    var cover = link;
                    var author = req.body.author;
                    var group = req.body.group;
                    var genre = req.body.genre.split(", ");
                    var description = req.body.description;
                    var status = req.body.status;

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


//Handle Edit manga info request 
app.post("/editMangaInfo", upload.single("file"), (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var id = req.body.id;
    var name = req.body.name;
    var subName = req.body.subName;
    var cover = "";
    var author = req.body.author;
    var group = req.body.group;
    var genre = req.body.genre.split(", ");
    var description = req.body.description;
    var status = req.body.status;
    userModel.login(username, password, (data, err) => {
        if (err) res.writeHead(500, err);
        if (data) {
            if (req.file) {
                imgurUpload.single(req.file.path, (link, err) => {
                    if (err) res.writeHead(500, "Internal Error");
                    if (link) {
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
    var username = req.body.username;
    var password = req.body.password;
    userModel.login(username, password, (data, err) => {
        if (data) {
            res.send("Server recieved files");
            var files = [];
            req.files.map((file, index) => {
                files.push(file.path);
            })
            var id = req.params.id;
            imgurUpload.multiFile(files, id, null, (data, err) => {
                if (err) console.log(err);
                if (data) console.log(data);
            })
        }
        else {
            res.writeHead(401, err);
        }
    })

})


app.post("/chapter/add/:id/:chapter", upload.array("files"), (req, res) => {
    var id = req.params.id;
    var chapter = req.params.chapter;
    res.send("Ok");
    var files = [];
    req.files.map((file, index) => {
        files.push(file.path);
    })
    imgurUpload.multiFile(files, id, "add", (data, err) => {
        if (err) console.log(err);
        if (data) console.log(data);
    })

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
    var username = req.body.username;
    var password = req.body.password;
    userModel.login(username, password, (data, err) => {
        if (err) res.send(err);
        if (data) res.send(data);
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