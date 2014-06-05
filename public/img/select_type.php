<!doctype html>
<html class="no-js" lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="img/favicon.png" type="image/x-icon"/>
 	<title>Down.YT - Baixe seus v&iacute;deos e m&uacute;sicas preferidas do Youtube</title>
   <meta name="description" content="Down.YT - Baixe seus v&iacute;deos e m&uacute;sicas preferidas do Youtube." />
	<link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
    <link rel="stylesheet" href="foundation.min.css" />
    <script src="js/modernizr.js"></script>
</head>
<body>
<div class="row" style="padding-top:60px;">
    <div class="large-10 medium-10 columns">
        <div align="center">
          <a href="index.php">  <img align="center"  title="Down.YT - Baixe seus v&iacute;deos e m&uacute;sicas preferidas do Youtube" src="img/logo.png"></a>
        </div>
    </div>
    <div class="large-2 medium-2 columns menu">
        <iframe src="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FDownYT%2F562274617197469%3Ffref%3Dts&amp;width&amp;layout=button_count&amp;action=like&amp;show_faces=true&amp;share=false&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:21px;" allowTransparency="true"></iframe>
        <a href="#" title="Contato"><i class="fa fa-envelope"></i></a>
        <a href="#" title="Sobre"><i class="fa fa-user"></i></a>
    </div>
</div>
<?php //exec('ffmpeg -i rtsp://r6---sn-jc47eu7z.c.youtube.com/CiILENy73wIaGQk6XRO5_fHKoRMYESARFEgGUgZ2aWRlb3MM/0/0/0/video.3gp -r 24 output2.mp3');

ini_set('max_execution_time','600000000000000000');
$url = $_POST['vid'];
/**
 * @param $ytURL
 * @return string
 */
function getYTid($ytURL)
{
    $ytvIDlen = 11;
    $idStarts = strpos($ytURL, "?v=");
    if($idStarts === FALSE)
        $idStarts = strpos($ytURL, "&v=");
    if($idStarts === FALSE)
        die("V�deo n�o encontrado, confira novamente sua URL.");

    $idStarts +=3;
    $ytvID = substr($ytURL, $idStarts, $ytvIDlen);
    return $ytvID;
}

$video = getYTid($url);
$video_feed = file_get_contents("http://gdata.youtube.com/feeds/api/videos/$video");
$sxml = new SimpleXmlElement($video_feed);
$namespaces = $sxml->getNameSpaces(true);
$media = $sxml->children($namespaces['media']);
$yt = $media->children($namespaces['yt']);
$yt_attrs = $yt->duration->attributes();

//vari�veis da YOUTUBE API, t�tulo, descri��o, palavras-chave e dura��o
$video_title = $sxml->title;

// converter segundo para minutos e dessa forma verificar se � maior que 15 minutos, se for n�o trabalha.
$tempo = round($video_length / 60,2);
if($tempo >= 15)
{
	echo "O v�deo que voc� est� tentando converter � muito grande, tente outro.";
}
else
{
    echo '<div class="row">';
    echo '<div class="large-12 medium-12 columns panel exibir radius">';
    echo '<h3>'.$video_title.'</h3>';
    echo '<iframe src="//www.youtube.com/embed/'.getYTid($url).'" frameborder="0" allowfullscreen></iframe>';
    echo '<div align="center"><a href="#" data-dropdown="drop" class="large-5 medium-5 columns button radius envia dropdown">Fazer Download do video</a>';
    echo '<ul id="drop" data-dropdown-content class="f-dropdown">';
    echo '<li><a href="#">Teste</a></li>';
    echo '</ul>';
    echo '<a id="mp3dl" href="media/video_to_mp3.php?vid='.$url.'" class="large-5 medium-5 columns button radius envia right" download="'.$video_title.'.mp3">Fazer Download do audio (.MP3)</a>';
    echo '<div align="center" id="load" style="display:none;"><img src="img/load.gif"></div>';
    echo '</div></div></div>';
}
/*
<script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
<script>
$(document).ready(function(e)
{
	get_timer();
});
function get_timer()
{
	setInterval(function()
	{
        $('#id').load('arquivo.php');
    },1000);
}
</script>

<div id="id">
</div>

*/?>
<script src="js/jquery.js"></script>
<script src="js/foundation.min.js"></script>
<script>
    function mp3dl(){
        setInterval(function(){
            $("#load").css('display','none');
        },180000);
    }
    $( "#mp3dl" ).bind( "click", function() {
        $("#load").css('display','block');
        mp3dl();
    });

    $(document).foundation();
    $( "#bt1" ).bind( "click", function() {
        ('#url').submit();
    });
</script>
</body>
</html>
