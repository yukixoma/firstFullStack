var Flickr = require("flickrapi");

var FlickrOptions = {
    api_key: "38ebc1d666f2689fddcb2ba5207d4f4c",
    secret: "3da187d71147c1d6",
    user_id: "156158483@N06",
    access_token: "72157690262162532-08bb08678eea7160",
    access_token_secret: "6379fcc380397f98",
}

Flickr.authenticate(FlickrOptions, function (error, flickr) {
    flickr.photos.getSizes({ api_key: "38ebc1d666f2689fddcb2ba5207d4f4c", photo_id: "40155008751" }, (err, res) => {
        if (err) console.log("error", err);
        if (res) console.log("res", res.sizes.size);
    });
});