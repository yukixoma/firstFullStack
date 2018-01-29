var express = require("express");
var path = require("path");
var fs = require("fs");

//App create
var app = express();
app.use(express.static(path.join(__dirname, "public")));

//multer handle file upload
var multer = require("multer");
var upload = multer({ dest: 'uploads/' });

//Connect to Imgur
var imgur = require("imgur");
imgur.setClientId("360ec78c61b2d44");

//body parser parse form data
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//webpack cofig, build react,js,css... to bundle.js
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
mongoose.connect(process.env.MONGODN_URI || "mongodb://localhost/manga");

//Config express route to let React router handle routing
var route = ["/", "/upload"];
app.get(route, (req, res) => {
    res.sendFile(path.resolve(__dirname, "index.html"));
});

//Config express route to let Client fetch data
app.get("/fetchMangaList", (req, res) => {
    manga.find({}, (err, data) => {
        if (err) throw err;
        if (data) {
            res.send(data);
        }
    })
})


//Handle new manga request
app.post("/new", upload.single("file"), (req, res) => {
    imgur.uploadFile(req.file.path)
        .then(json => {
            var name = req.body.name;
            var subName = req.body.subName;
            var cover = json.data.link;
            var author = req.body.author;
            var group = req.body.group;
            var genre = req.body.genre.split(", ");
            var description = req.body.description;
            var status = req.body.name;
            var username = "yukixoma";

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
                console.log(newManga);
            })
        })
        .catch(err => console.log(err.massage));
});










app.listen(3000 || process.env.PORT);