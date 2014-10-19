	$(document).ready(function(){
		$('.tooltip').darkTooltip({
			gravity:'east',
			theme: 'light',
			animation: 'flipIn'
		});

		$('#vd-o').hide();
		$("#download-video").click(function(){
	 		$("#vd-o").fadeToggle(500);

	 	});
	 	/**
	 * Created by matheus on 06/06/14.
	 */
	id = $('#select').attr('data-id');
	count_origin = false;
	count_mp3 = false;
	site_url = $('body').attr('data-url');
	$('#url').on('submit', function(e){
	    e.preventDefault();
	    var url = $('#url input').val();
	    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	    var match = url.match(regExp);
	    if (match&&match[2].length==11){
	        console.log(match[2]);
	        location.href = site_url + '/select/' + match[2];
	    }else{
	        alert('Not a valid YouTube video - Please check this');
	    }
	});
	$('.close').on('click', function(e) {
	    location.reload();
	});
	$('#bt-mp3').on('click', function(e){
	    $('#mp3').foundation('reveal', 'open');
	    if(count_origin == false){
	        $('#dl_mp3').load(site_url + '/download/audio/'+id);
	        count_origin = true;
	    }
	});
	$('#bt-origin').on('click', function(e){
	    $('#origin').foundation('reveal', 'open');
	    if(count_mp3 == false){
	        $('#dl_origin').load(site_url + '/download/original/'+id);
	        count_mp3 = true;
	    }
	});

	});


