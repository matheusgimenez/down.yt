/**
 * Created by matheus on 06/06/14.
 */
id = $('#select').attr('data-id');
$('#url').on('submit', function(e){
    e.preventDefault();
    var url = $('#url input').val();
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match&&match[2].length==11){
        console.log(match[2]);
        location.href = 'http://down.yt:3000/select/' + match[2];
    }else{
        $('#alert-form').show();
    }
});
$('.close').on('click', function(e) {
    location.reload();
});
$('#bt-mp3').on('click', function(e){
    $('#mp3').foundation('reveal', 'open');
    $('#dl_mp3').load('http://down.yt:3000/download/audio/'+id);
});
$('#bt-origin').on('click', function(e){
    $('#origin').foundation('reveal', 'open');
    $('#dl_origin').load('http://down.yt:3000/download/original/'+id);
});
