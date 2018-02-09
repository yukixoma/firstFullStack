var Flickr = require("flickrapi"),
    flickrOptions = {
      api_key: "38ebc1d666f2689fddcb2ba5207d4f4c",
      secret: "3da187d71147c1d6",
      permissions: "delete"
    };
 
Flickr.authenticate(flickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API object
});

const FLICKR_USER_ID="156158483@N06";
const FLICKR_ACCESS_TOKEN="72157690262162532-08bb08678eea7160";
const FLICKR_ACCESS_TOKEN_SECRET="6379fcc380397f98";