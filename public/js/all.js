/**
 * Created by matheus on 06/06/14.
 */
id = $('#select').attr('data-id');
count_origin = false;
count_mp3 = false;
$('#url').on('submit', function(e){
    e.preventDefault();
    var url = $('#url input').val();
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match&&match[2].length==11){
        console.log(match[2]);
        location.href = 'http://down.yt/select/' + match[2];
    }else{
        $('#alert-form').show();
    }
});
$('.close').on('click', function(e) {
    location.reload();
});
$('#bt-mp3').on('click', function(e){
    $('#mp3').foundation('reveal', 'open');
    if(count_origin == false){
        $('#dl_mp3').load('http://down.yt/download/audio/'+id);
        count_origin = true;
    }
});
$('#bt-origin').on('click', function(e){
    $('#origin').foundation('reveal', 'open');
    if(count_mp3 == false){
        $('#dl_origin').load('http://down.yt/download/original/'+id);
        count_mp3 = true;
    }
});
