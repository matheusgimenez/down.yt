/*
 * convert to mp3/mp4
 */

exports.mp4 = function (req, res) {
    var fs = require('fs');
    var exec = require('child_process').exec;
    var id = req.params.id;
    var file = id;
    var dir = '/node/down/public/user-files/';

    exec(' youtube-dl --get-filename -o ' + id + '".%(ext)s" '+id, function (error, stdout, stderr) {
        if (error) throw error;

        var youtube_dl = 'youtube-dl -o ' + dir + stdout + ' ' + id
        var youtube_dl = youtube_dl.replace(/(\r\n|\n|\r)/gm, "");
        var ffmpeg = 'ffmpeg -i ' + dir + stdout + ' ' + dir + file + '-downyt.mp4';
        var ffmpeg = ffmpeg.replace(/(\r\n|\n|\r)/gm, "");
        //exec('youtube-dl -o ' + dir + stdout + ' ' + id);
        //res.send(youtube_dl);
        exec(youtube_dl.trim(), function (error2, stdout2, stderr2) {
            console.log(stdout2);
            res.write('<a href="http://74.118.192.245:3000/user-files/' + file + '.mp4" download>Click to download</a>');
            res.end();
        });
    });
};