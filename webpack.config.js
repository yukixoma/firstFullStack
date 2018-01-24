const webpack   = require("webpack");
const path      = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "public"),
        publicPath: "/public/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['react', 'es2015',"stage-2"]
                }
            }
        ]
    },
    // plugins:[
    //     new webpack.DefinePlugin({
    //       'process.env':{
    //         'NODE_ENV': JSON.stringify('production')
    //       }
    //     }),
    //     new webpack.optimize.UglifyJsPlugin({
    //       compress:{
    //         warnings: true
    //       }
    //     })
    //   ]
}