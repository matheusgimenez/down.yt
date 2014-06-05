/*
 * convert to mp3/mp4
 */

exports.mp4 = function (req, res) {
    var fs = require('fs');
    ytdl = require('ytdl');
    var id = req.params.id;
    var file = id + '.mp4';
    var path = require('path');
    ytdl('https://www.youtube.com/watch?v=' + id, { filter: function (format) {
        return format.container === 'mp4';
    }, err: function(){
    console.log(err);
    }})
        .pipe(fs.createWriteStream(file));
        res.download(path.basename(file), {root: path.dirname(file)});
};