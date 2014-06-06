/*
 * convert to mp3/mp4
 */

exports.mp4 = function (req, res) {
    var sys = require('sys')
    var exec = require('child_process').exec;
    var fs = require('fs');
    var path = require('path');
    var id = req.params.id;
    var file = id;
    exec('youtube-dl -o '+file+'.tmp https://www.youtube.com/watch?v='+id);
    exec('ffmpeg -i'+file+'.tmp '+file+'.mp4');

    var _file = __dirname + '/public/user-files/' + file +'.mp4';
    var filename = path.basename(_file);
    var mimetype = mime.lookup(_file);

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);
    var filestream = fs.createReadStream(_file);
    filestream.pipe(res);
};