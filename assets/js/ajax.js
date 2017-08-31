

const btnSubmit = $('input[type=submit]');
const input = $('textarea[name=msg]');


let refresh = function () {
	let lastID = $('.inner-content li').last();
	let test = lastID.data('id');
	console.log(test);

	// $.ajax({ 
	// 	url: "./api.php", 
	// 	type: 'POST',
	// 	data: {action: 'refresh'},
	// 	success: function(data){
	// 		console.log(data);
	//     }
	// });
}

refresh();


btnSubmit.click(function(event) {
	event.preventDefault();
	console.log('j\'envoi un msg, ^^');

	let msg = input.val(); 
	
	$.ajax({ 
		url: "./api.php", 
		type: 'POST',
		data: {msg: msg},
		success: function(data){
			console.log(data);
			
	    }
	});
});

