
// Enlever iframes
$('iframe').hide();

// Start building interface
const container = $('#chat');
const chat = $('<div class="inner-content"></div>');
const list = $('<ul></ul>');
chat.append(list);
container.append(chat);
const form = $('<form></form>');
const input = $('<textarea rows="5"></textarea>');
const button = $('<input type="submit" value="send">');
form.append(input, button);
container.append(form);

const load = function() {
	$.ajax({ 
		url: "inc/api.php", 
		type: 'POST',
		data: {action: 'load'},
		dataType: "json",
		success: function(msgs){
			addToChat(msgs);
	    },
	    complete: poll
	});
}

const poll = function () {

	chat.scrollTop(chat[0].scrollHeight);
	//setTimeout(refresh, 3000);
}

console.log(chat);
console.log(chat[0]);

// let height_of_chat = $('.chat_zone')[0].scrollHeight;

// let height_of_chat = $('.chat_zone')[0].scrollHeight;
// $('.chat_zone').scrollTop(height_of_chat);
// console.log(height_of_chat);

load();

// End building interface

const addToChat = function (msgs) {

	$.each(msgs, function(index, msg) {
		let post = $('<li data-id="'+msg.id+'"><strong>'+msg.user+'</strong> ['+msg.hour+':'+msg.minutes+'] '+msg.content+'</li>');
		list.append(post);
	});
}

let refresh = function () {
	let lastID = list.children('li').last().data('id');
	console.log(lastID);

	$.ajax({ 
		url: "inc/api.php", 
		type: 'POST',
		data: {lastID: lastID},
		dataType: "json",
		success: function(msgs){
			console.log('refresh');
			addToChat(msgs);
	    },
	    complete: poll
	});
}

button.click(function(event) {
	event.preventDefault();
	console.log('j\'envoi un msg, ^^');

	let msg = input.val(); 
	
	$.ajax({ 
		url: "inc/api.php", 
		type: 'POST',
		data: {msg: msg},
		success: function(data){
			console.log(data);
			refresh();
	    }
	});

	input.val('');
});

