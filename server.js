var express     = require("express");
var path        = require("path");
var fs          = require("fs");

//App create
var app         = express();
app.use(express.static(path.join(__dirname,"public")));

//Multer handle file upload
var multer      = require("multer");
var upload      = multer({ dest: 'uploads/' })

//body parser parse form data
var bodyParser  = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//webpack cofig, build react,js,css => bundle.js
var webpack = require("webpack");
var config  = require("./webpack.config");
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
mongoose.connect(process.env.MONGODN_URI || "mongodb://localhost/manga");





app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname,"index.html"));
});

app.post("/new",upload.single("file"), (req,res) => {
    
});










app.listen(3000 || process.env.PORT);