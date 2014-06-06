/*
 * convert to mp3/mp4
 */

exports.mp4 = function (req, res) {
    var fs = require('fs');
    var path = require('path');
    var mime = require('mime');
    var exec = require('child_process').exec;
    var id = req.params.id;
    var file = id;
    var dir = '/node/down/public/user-files/';
    console.log('variaveis');

    exec(' youtube-dl --get-filename -o ' + id + '".%(ext)s" H2sgBwicbF0', function (error, stdout, stderr) {
        if (error) throw error;

        var youtube_dl = 'youtube-dl -o ' + dir + stdout + ' ' + id
        var youtube_dl = youtube_dl.replace(/(\r\n|\n|\r)/gm,"");
        var ffmpeg = 'ffmpeg -i ' + dir + stdout + ' ' + dir + file + '-downyt.mp4';
        var ffmpeg = ffmpeg.replace(/(\r\n|\n|\r)/gm,"");
        //exec('youtube-dl -o ' + dir + stdout + ' ' + id);
        //res.send(youtube_dl);
        exec(youtube_dl.trim(), function (error2, stdout2, stderr2) {
            console.log(stdout2);
            exec(ffmpeg.trim(), function (error3, stdout3, stderr3) {
                console.log(stdout3);
                res.write('<a href="http://74.118.192.245:3000/public/user-files/'+file+'-downyt.mp4" download>Click to download</a>');
            });
        });
        //exec(ffmpeg.trim());
        //console.log(youtube_dl);
        //exec('ffmpeg -i ' + dir + stdout + ' ' + dir + file + '.mp4')
        //var _file = dir + file + '.mp4';
        //res.download(_file);
        //res.write('testando resultados... var error:'+error+'  / var stdout:'+stdout+'  /var stderr'+stderr);
    });
    /*
     exec('cd /down/node');
     //exec('youtube-dl --get-filename -o '+id+'".%(ext)s"' + id);
     console.log('youtube-dl -o '+file+'.tmp https://www.youtube.com/watch?v='+id);
     //exec('ffmpeg -i /public/user-files/'+file+'.tmp /public/user-files/'+file+'.mp4');
     console.log('ffmpeg -i'+file+'.tmp '+file+'.mp4');
     res.write('ffmpeg -i /public/user-files/'+file+'.tmp /public/user-files/'+file+'.mp4   ')
     res.write('youtube-dl --get-filename -o '+id+'".%(ext)s" ' + id);
     res.end();
     /*
     */
};