var intervalId = -1;
self.addEventListener('message', function(e){
	var data = e.data;
	switch(data.cmd){
		case 'begin':
			self.postMessage({cmd: 'logger', dat: 'interval begin'});
			intervalId = setInterval(powerful, 100);
		break;
		case 'end':
			self.postMessage({cmd: 'logger', dat: 'interval end'});
			clearInterval(intervalId);
		break;
	}
});

function powerful(){
	self.postMessage({cmd: 'logger', dat: 'Powerful Begin'});
	for(var i = 0; i < 1000000000; i++){
		if(i % 10000000 == 0){
			self.postMessage({cmd: 'status'});
		}
	}
	self.postMessage({cmd: 'appender', dat: 'For loop over'});
	self.postMessage({cmd: 'logger', dat: 'Powerful End'});
}
