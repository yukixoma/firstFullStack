var express     = require("express");
var path        = require("path");
var fs          = require("fs");
var app         = express();
var bodyParser  = require("body-parser");
var multer      = require("multer");
var upload      = multer({ dest: 'uploads/' })


var webpack = require("webpack");
var config  = require("./webpack.config");
var compiler = webpack(config);
var webPackDev = require("webpack-dev-middleware");
var webpackHot = require("webpack-hot-middleware");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname,"public")));

app.use(webPackDev(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}))
app.use(webpackHot(compiler));

app.get("/", (req,res) => {
    res.sendFile(path.resolve(__dirname,"index.html"));
});

app.post("/new",upload.single("file"), (req,res) => {
    console.log(req.body);
    console.log(req.file.path);
});










app.listen(3000 || process.env.PORT);