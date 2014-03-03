var worker = new Worker('worker.js');

var curr_div = null;
worker.addEventListener('message', function(e){
	var data = e.data;
	switch(data.cmd){
		case 'logger':
			console.log(data.dat);
			break;
		case 'appender':
			curr_div = $('<div>' + data.dat + '</div>');
			curr_div.css({
				'white-space': 'no-wrap'
			});
			$('#poster').append(curr_div);
			break;
		case 'status':
			curr_div.append('|');
			break;
		default:
			console.log('Unkown Command: ' + data.cmd);
	}
}, false);

$(document).ready(function(){
	curr_div = $('<div>Begin</div>');
	curr_div.css({
		'white-space': 'no-wrap'
	});
	var started = false;
	$('#btn').on('click', function(){
		if (!started) {
			started = true;
			console.log('starting worker');
			worker.postMessage({cmd: 'begin'}); }
		else {
			started = false;
			worker.postMessage({cmd: 'end'}); }
	});
	var anim_div = $('<div>');
	$('body').append(anim_div);
	anim_div.css({
		background: 'blue',
		width: '100px',
		height: '100px',
		position: 'fixed',
		top: 0,
		left: 0
	});
	setInterval(function(){
		var curr_top = anim_div.css('top');
		var curr_left = anim_div.css('left');
		anim_div.css({
			top: (10 * Math.random()),
			left: $(window).width() * Math.random()
		});
	}, 100)
});
