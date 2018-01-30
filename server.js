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
mongoose.connect(process.env.MONGODN_URI || "mongodb://localhost/manga");

//Config express route to let React router handle routing
var route = ["/", "/new", "/register",];
app.get(route, (req, res) => {
    res.sendFile(path.resolve("./", "index.html"));
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

app.get("/fetchMangaInfo/:id", (req, res) => {
    var id = req.params.id;
    manga.findOne({ _id: id }, (err, data) => {
        if (err) res.writeHead(500, "Database error");
        if (data) res.send(data);
    })
})

app.post("/fetchUserUploadedManga", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    userModel.login(username, password, (data, err) => {
        if(data === "Login success") {
            manga.find({username: username},(err,result) => {
                if(err) throw err;
                res.send(result);
            })
        } else {
            res.send("Authentication error");
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
            var status = req.body.status;
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
                res.send("New manga added");
            })
            fs.unlink(req.file.path,err=>{
                if(err) throw err;
            })
        })
        .catch(err => console.log(err.massage));
});

//Handle Manga delete request 
app.post("/remove/manga/:id",(req,res)=> {
    var id = req.params.id;
    var username = req.body.username;
    var password = req.body.password;
    userModel.login(username,password,(data,err) => {
        if(err) throw err;
        if(data) {
            manga.findOneAndRemove({_id:id},(err,result)=> {
                if(err) throw err;
                manga.find({},(err,data)=> {
                    if(err) throw err;
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







app.listen(3000 || process.env.PORT);