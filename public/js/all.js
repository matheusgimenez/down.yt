/**
 * Created by matheus on 06/06/14.
 */

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

