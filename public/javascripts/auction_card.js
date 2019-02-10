console.log('auction_card.js connected');

$(document).ready(function() {
	console.log('function entered');
	$('#edit_auc_button').click(function(event) {
		event.preventDefault();
		$('#edit_auction')
			.css({'display': 'block'});
	})
});

$(document).ready(function() {
	console.log('function entered');
	$('#add_auc_button').click(function(event) {
		event.preventDefault();
		$('#add_auction')
			.css({'display': 'block'});
	})
});

$(document).ready(function() {
	console.log('finction 3 entered');
	$('#del_auc_button').click(function(event) {
		event.preventDefault();
			$('#del_auction')
			.css({'display': 'block'});
	})
})

$(document).ready(function() {
	console.log('finction 4 entered');
	$('#auc_reset_button').click(function(event) {
		event.preventDefault();
			$('#del_auction')
			.css({'display': 'none'});
	})
})