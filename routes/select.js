decodeQueryString = function (queryString) {
    var key, keyValPair, keyValPairs, r, val, _i, _len;
    r = {};
    keyValPairs = queryString.split("&");
    for (_i = 0, _len = keyValPairs.length; _i < _len; _i++) {
        keyValPair = keyValPairs[_i];
        key = decodeURIComponent(keyValPair.split("=")[0]);
        val = decodeURIComponent(keyValPair.split("=")[1] || "");
        r[key] = val;
    }
    return r;
};
exports.select = function (req, res) {
    var id = req.params.id;
    request = require('request');
    if (!id) {
        res.send("Error: Verique sua URL 1");
    }
    request('http://www.youtube.com/get_video_info?video_id=' + id, function (error, response, content) {
        if (!error && response.statusCode != 200) {
            res.send('Algo errado por aqui :(  2')
        }
        var quality, sources, stream, type, urlEncodedStream, _i, _len, _ref;
        var video = decodeQueryString(content);
        _ref = video.url_encoded_fmt_stream_map.split(",");
        res.render('select.ejs', {quality: quality, sources: sources, stream: stream, type: type,
            urlEncodedStream: urlEncodedStream, _i: _i, _len: _len, _ref: _ref, video: video, id: id});
        console.log('passou render');
    })
};