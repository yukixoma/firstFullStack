var express =  require("express");
var path = require("path");
var app = express();

var webpack = require("webpack");
var config  = require("./webpack.config");
var compiler = webpack(config);
var webPackDev = require("webpack-dev-middleware");
var webpackHot = require("webpack-hot-middleware");


app.use(express.static(path.join(__dirname,"public")));

app.use(webPackDev(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}))
app.use(webpackHot(compiler));

app.get("/",function(req,res) {
    res.sendFile(path.resolve(__dirname,"index.html"));
})











app.listen(3000 || process.env.PORT);