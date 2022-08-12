$(function(){
	var duration = 300;

	$('#buttons2 button').on('mouseover', function(){
		var $btn = $(this).stop(true).animate({
			backgroundColor:'#fae000',
			color:'#fff'
		}, duration);
		$btn.find('img:nth-child(1)').stop(true).animate({
			opacity:0
		}, duration)
		$btn.find('img:nth-child(2)').stop(true).animate({
			opacity:1
		}, duration);
	}).on('mouseout', function(){
		var $btn = $(this).stop(true).animate({
			backgroundColor:'#fff',
			color:'#01b269'
		}, duration);
		$btn.find('img:nth-child(1)').stop(true).animate({
			opacity:1
		}, duration)
		$btn.find('img:nth-child(2)').stop(true).animate({
			opacity:0
		}, duration);
	})
});