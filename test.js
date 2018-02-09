var axios = require("axios");
var flickrID =
    [
        26291698788,
        40164754941,
        39453444064,
        26291699988,
        39453444984,
        39453445544,
        39265855575,
        25292795807,
        40132097152,
        26291703878,
        40164760101,
        26291705308,
        39453449004
    ]
var i = 0;
var link = [];
var flickrGetUrl = () => {
    if (i < flickrID.length) {
        var id = flickrID[i];
        var endPoint = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes"
            + "&api_key=67c0c30c61ac9292bb6061da34d3fbfe"
            + "&photo_id="
            + id
            + "&format=json&nojsoncallback=1";
        axios({
            method: "GET",
            url: endPoint,
            data: null
        }).then(res => {
            var data = res.data.sizes.size;
            var original = data.filter(e => {
                return e.label === "Original";
            })
            link.push(original[0].source);
            i += 1;
            flickrGetUrl();
        }).catch(err => console.log(err));
    }
    if (i === flickrID.length) console.log(link);
}

flickrGetUrl();
