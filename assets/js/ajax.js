

const btnSubmit = $('input[type=submit]');
const input = $('textarea[name=msg]');
const ully = $('.inner-content');
console.log(ully);




let refresh = function (lastID) {
	console.log('alors');
	//let lastID = $('ul');
	//console.log(lastID.css('background', 'red'));
	lastID.css('background', 'red')
	// $.ajax({ 
	// 	url: "./api.php", 
	// 	type: 'POST',
	// 	data: {action: 'refresh'},
	// 	success: function(data){
	// 		console.log(data);
	//     }
	// });
}

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
			refresh(l);
	    }
	});
});

