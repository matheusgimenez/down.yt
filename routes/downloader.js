/*
 * convert to mp3/mp4
 */

exports.original = function (req, res) {
    var exec = require('child_process').exec;
    var id = req.params.id;
    var id = id.replace(/(["\s'$`\\])/g,'\\$1');
    var file = id;
    var dir = '/home/deshawn/node/down.yt/public/user-files/';
    var request = require('request');
    request('http://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=' + id, function (validate_error, validate_response, validate_content) {
        if (validate_response.statusCode == 200 && id.search('&') == '-1' && id.search('&amp;') == '-1'){
            exec(' youtube-dl --get-filename -o ' + id + '".%(ext)s" http://www.youtube.com/watch?v=' + id, function (error, stdout, stderr) {
                if (error) throw error;
                var youtube_dl = 'youtube-dl -o ' + dir + stdout + ' http://www.youtube.com/watch?v=' + id;
                var youtube_dl = youtube_dl.replace(/(\r\n|\n|\r)/gm, "");
                //exec('youtube-dl -o ' + dir + stdout + ' ' + id);
                //console.log(youtube_dl);
                exec(youtube_dl.trim(), function (error2, stdout2, stderr2) {
                    console.log(stdout2);
                    res.write('<a class="large-12 medium-12 columns button radius envia" href="'+app.url+'/user-files/' + file + '.mp4" download>Click to download</a>');
                    res.end();
                });
            });
        }
        else{
            res.write('5b43c0c536da6fe7bb79286722470822/ / ');
            res.write('ID or URL is wrong');
            res.end();
        }
    });
};
exports.audio = function (req, res) {
    var exec = require('child_process').exec;
    var fs = require('fs');
    var id = req.params.id;
    var id = id.replace(/(["\s'$`\\])/g,'\\$1');
    var file = id;
    var dir = '/home/deshawn/node/down.yt/public/user-files/';
    var request = require('request');
    var fs = require('fs');
    request('http://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=' + id, function (validate_error, validate_response, validate_content) {
        if (validate_response.statusCode == 200 && id.search('&') == '-1' && id.search('&amp;') == '-1'){
            exec(' youtube-dl --get-filename -o ' + id + '".%(ext)s" http://www.youtube.com/watch?v=' + id, function (error, stdout, stderr) {
                if (error) throw error;
                var temp_name = stdout;
                var youtube_dl = 'youtube-dl -o ' + dir + temp_name + ' http://www.youtube.com/watch?v=' + id;
                var youtube_dl = youtube_dl.replace(/(\r\n|\n|\r)/gm, "");
                //exec('youtube-dl -o ' + dir + stdout + ' ' + id);
                //res.send(youtube_dl);
                console.log(stdout)
                exec(youtube_dl.trim(), function (error2, stdout2, stderr2) {
                    console.log(stdout2);
                    if(error2){console.log('deuerro?')}
                    var ffmpeg = 'ffmpeg -i ' + dir + temp_name + ' ' + dir + file + '.mp3';
                    var ffmpeg = ffmpeg.replace(/(\r\n|\n|\r)/gm, "");
                    fs.open(dir+file+'.mp3', "r", function(error, fd) {
                        if (!error) {
                            console.log('existe');
                            res.write('<a class="large-12 medium-12 columns button radius envia" href="'+siteinfo.url+'/user-files/' + file + '.mp3" download>Click to download</a>');
                            res.end();
                        }
                        else{
                            console.log('nao')
                            exec(ffmpeg.trim(), function (error3, stdout3, stderr3) {
                                if(error3){console.log(error3)}
                                console.log('deu erro?');
                                res.write('<a class="large-12 medium-12 columns button radius envia" href="'+siteinfo.url+'/user-files/' + file + '.mp3" download>Click to download</a>');
                                res.end();
                            });
                        }
                    });
                });

            });
        }
        else{
            res.write('5b43c0c536da6fe7bb79286722470822/ / ');
            res.write('ID or URL is wrong');
            res.end();
        }
    });
};
