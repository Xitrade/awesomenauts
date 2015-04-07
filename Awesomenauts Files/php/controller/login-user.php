<?php
	require_once(__DIR__ . "/../model/config.php");

	$array = array(
		'exp' => '',
		'exp1' => '',
		'exp2' => '',
		'exp3' => '',
		'exp4' => '',
	);	

	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);


	//user inputs information and will be selected in the query
	$query = $_SESSION["connection"]->query("SELECT * FROM users WHERE username = '$username'");
	//tells how many rows were selected from the database
	if ($query->num_rows == 1) {
		$row = $query->fetch_array();

		if ($row["password"] === crypt($password, $row["salt"])) {
			$_SESSION["authenticated"] = true;

			$array["exp"] = $row["exp"];
			$array["exp1"] = $row["exp1"];
			$array["exp2"] = $row["exp2"];
			$array["exp3"] = $row["exp3"];
			$array["exp4"] = $row["exp4"];

			$_SESSION["name"] = $username;

			echo json_encode($array);
		}
		else {
			echo "Invalid password and username... U FOKEN WOT m89?!!!?!?!?!!!!!?!?";
		}
	}
	else {
		echo "Invalid password and username... sruberonies";
	}

?>