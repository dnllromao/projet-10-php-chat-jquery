<?php 

	include 'pdo.php';

	session_start();

	if ( !empty($_POST) && !empty($_POST['msg']) ) :
		
		$msg = filter_input(INPUT_POST, "msg", FILTER_SANITIZE_STRING);
	 	try {

	 		$req = $db -> prepare("INSERT INTO msgs (content, moment, user_id) VALUES (:content, NOW(), (SELECT id FROM users WHERE pseudo = :pseudo))");
	 		$res = $req -> execute(array(
	 				'content' => $msg,
	 				'pseudo' => $_SESSION['pseudo']
	 		));

	 		if($res) {
	 			echo 'sucess';
	 		}

	 	} catch (Exception $e){
	 		die('Error: '.$e->getMessage());
	 	}


	endif;

	if ( !empty($_POST) && !empty($_POST['action']) && $_POST['action'] == 'refresh') :

	$req = $db -> query("SELECT * FROM (SELECT msgs.id AS id, msgs.content AS content, HOUR(msgs.moment) AS hour, MINUTE(msgs.moment) AS minutes, users.pseudo AS user FROM msgs INNER JOIN users ON msgs.user_id = users.id ORDER BY msgs.id DESC LIMIT 10) AS new ORDER BY id ASC");

	$result = $req->fetchAll();

	echo json_encode($result);

	endif;

?>