console.log('picture_card.js connected');

$(document).ready(function() {
	console.log('function entered');
	$('#edit_button').click(function(event) {
		event.preventDefault();
		$('#edit_picture')
			.css({'display': 'block'});
	})
	console.log($('#edit_picture').css('display'));
});

$(document).ready(function() {
	console.log('finction 2 entered');
	$('#add_button').click(function(event) {
		event.preventDefault();
			$('#add_picture')
			.css({'display': 'block'});
	})
})

$(document).ready(function() {
	console.log('finction 3 entered');
	$('#del_button').click(function(event) {
		event.preventDefault();
			$('#del_picture')
			.css({'display': 'block'});
	})
})



$(document).ready(function() {
	console.log('finction 4 entered');
	$('#reset_button').click(function(event) {
		event.preventDefault();
			$('#del_picture')
			.css({'display': 'none'});
	})
})