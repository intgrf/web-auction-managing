console.log('users.js connected');

$(document).ready(function() {
	console.log('function entered');
	$('#add_user_button').click(function(event) {
		event.preventDefault();
		$('#add_user')
			.css({'display': 'block'});
	})
});


$(document).ready(function() {
	console.log('finction 3 entered');
	$('#del_user_button').click(function(event) {
		event.preventDefault();
			$('#del_user')
			.css({'display': 'block'});
	})
})

$(document).ready(function() {
	console.log('finction 4 entered');
	$('#user_reset_button').click(function(event) {
		event.preventDefault();
			$('#del_user')
			.css({'display': 'none'});
	})
})

$(document).ready(function() {
	console.log('finction 4 entered');
	$('#user_reset_button').click(function(event) {
		event.preventDefault();
			$('#del_user')
			.css({'display': 'none'});
	})
})