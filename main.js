var worker = new Worker('worker.js');
var intervalId = null

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

function withoutWorker(){
	var powerful = function(){
		console.log( 'Powerful Begin' );
		for(var i = 0; i < 1000000000; i++){
			if(i % 10000000 == 0){
				curr_div.append('|');
			}
		}
		curr_div = $('<div>For loop over</div>');
		curr_div.css({
			'white-space': 'no-wrap'
		});
		$('#poster').append(curr_div);
		console.log( 'Powerful End' );
	}

	intervalId = setInterval(powerful, 100);
}

$(document).ready(function(){
	var started = false;
	$('#btn').on('click', function(){
		if (!started) {
			started = true;
			console.log('starting worker');
			curr_div = $('<div>Begin</div>');
			curr_div.css({
				'white-space': 'no-wrap'
			});
			$('#poster').append(curr_div);
			$(this).text('Stop Worker');
			worker.postMessage({cmd: 'begin'}); 
		}
		else {
			started = false;
			$(this).text('Start Worker');
			worker.postMessage({cmd: 'end'}); }
	});
	var started2 = false;
	$('#btn2').on('click', function(){
		if (!started2) {
			started2 = true;
			console.log('starting interval');
			$(this).text('Stop Interval');
			curr_div = $('<div>Begin</div>');
			curr_div.css({
				'white-space': 'no-wrap'
			});
			$('#poster').append(curr_div);
			withoutWorker();
		}
		else {
			started2 = false;
			console.log('ending interval');
			$(this).text('Start Interval');
			clearInterval(intervalId);
		}
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
	curr_top = (Math.random() * $(window).height()) + 'px';
	curr_left = (Math.random() * $(window).width()) + 'px';
	setInterval(function(){
		curr_top = parseFloat(curr_top);
		curr_left = parseFloat(curr_left);
		var next_top = curr_top + ((40 * Math.random()) - 20);
		var next_left = curr_left + ((40 * Math.random()) - 20);
		if(next_top < 0) next_top = 0;
		if(next_left < 0) next_left = 0;
		if(next_top > $(window).height()) next_top = $(window).height();
		if(next_left > $(window).width()) next_left = $(window).width();
		anim_div.css({
			top: next_top,
			left: next_left
		});
		curr_top = anim_div.css('top');
		curr_left = anim_div.css('left');
	}, 100)
});
