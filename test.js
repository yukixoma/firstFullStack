// var Flickr = require("flickrapi");

// var FlickrOptions = {
//     api_key: "38ebc1d666f2689fddcb2ba5207d4f4c",
//     secret: "3da187d71147c1d6",
//     user_id: "156158483@N06",
//     access_token: "72157690262162532-08bb08678eea7160",
//     access_token_secret: "6379fcc380397f98",
// }

// Flickr.authenticate(FlickrOptions, function (error, flickr) {
//     let getInfo = (api_key, photo_id) => {
//         return new Promise((res, rej) => {
//             flickr.photos.getSizes({ api_key, photo_id }, (err, data) => {
//                 if (err) rej(err);
//                 if (data) res(data.sizes.size);
//             })
//         })
//     }
//     // flickr.photos.getSizes({ api_key: "38ebc1d666f2689fddcb2ba5207d4f4c", photo_id: "40155008751" }, (err, res) => {
//     //     if (err) console.log("error", err);
//     //     if (res) console.log("res", res.sizes.size);
//     // });

//     getInfo("38ebc1d666f2689fddcb2ba5207d4f4c","40155008751").then(res => console.log(res)).catch(err => console.log(err));

// });

// var mongoose = require("mongoose");
// var manga = require("./models/manga");
// mongoose.connect("mongodb://yukixoma:123456789@ds046357.mlab.com:46357/manga");

// manga.findOne({ _id: "5a72e1d40a498c026fc387ae" }, (err, data) => {
//     if (err) console.log(err);
//      if (data) console.log(data.chapter[1]);
//  })
// var bookmark = require("./models/bookmark");

// var newBookmark = new bookmark({
//     username: "yukixoma",
//     bookmarked: []
// })
// newBookmark.save(err => {
//     if (err) throw err;
// });

var today = new Date();
console.log(today.toISOString());