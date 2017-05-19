chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		$(document).arrive('.ghx-newcard', function() {
			// 'this' refers to the newly created element
			colorJiraCard(this);
		});
	}
	}, 10);

	function colorJiraCard(card) {
		// make some background transparent
		$(card).find('.ghx-items-container').css('background-color', 'rgba(0,0,0,0)');

		var grabber = $(card).find('.ghx-grabber');
		if ($(grabber).css('background-color') && $(grabber).css('background-color') != "rgb(238, 238, 238)") {
			$(grabber).parent().css('background-color', $(grabber).css('background-color').replace(')', ', 0.15)').replace('rgb', 'rgba'));
		} else {
			$(grabber).parent().css('background-color', 'rgba(255, 255, 255, 0.15)');
		}

		// handle hover effect
		$(grabber).parent().hover(function(){
			$(this).css('background-color', $(this).css('background-color').replace(', 0.15)', ', 0.25)'));
			$(this).css('background-color', $(this).css('background-color').replace('255, 255, 255,', '238, 238, 238,'));
		},function(){
			$(this).css('background-color', $(this).css('background-color').replace(', 0.25)', ', 0.15)'));
			$(this).css('background-color', $(this).css('background-color').replace('238, 238, 238,', '255, 255, 255,'));
		});
	}
});