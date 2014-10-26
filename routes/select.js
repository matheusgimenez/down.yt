exports.select = function (req, res) {
    css = 'style-select.css';
    var exec = require('child_process').exec;
    var id = req.params.id;
    request = require('request');
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
    if (!id) {
        res.send("Error: Verique sua URL 1");
    }
    request('http://www.youtube.com/oembed?url=http://www.youtube.com/watch?v='+id, function (validate_error, validate_response, validate_content){
        if (validate_response.statusCode == 200 && id.search('&') == '-1' && id.search('&amp;') == '-1'){
            request('http://www.youtube.com/get_video_info?video_id=' + id, function (error, response, content) {
                if (!error && response.statusCode != 200) {
                    res.send('Algo errado por aqui :(  2');
                }
                var quality, sources, stream, type, urlEncodedStream, _i, _len, _ref;
                var video = decodeQueryString(content);
                exec(' youtube-dl --get-filename -o ' + '"%(title)s" http://www.youtube.com/watch?v=' + id, function (error, stdout, stderr) {
                    console.log(stdout);
                    var title = stdout;

                    console.log(title);
                    if (typeof video.url_encoded_fmt_stream_map == 'undefined') {
                        _ref = 'protect';
                    }
                    else {
                        _ref = video.url_encoded_fmt_stream_map.split(",");
                    }
                    res.render('select.ejs', {quality: quality, sources: sources, stream: stream, type: type,
                        urlEncodedStream: urlEncodedStream, _i: _i, _len: _len, _ref: _ref, video: video, id: id, title: title, url: siteinfo.url});
                    console.log('passou render');
                });
            });
        }
        else{
            res.render('error.ejs',{message:'Ooops.. This ID is wrong or been deleted', url: siteinfo.url});
        }
    });
};