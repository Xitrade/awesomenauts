<?php

	require_once(__DIR__ . "/../model/config.php");

	$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
	$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);

									  //Creates unique encryption
	$salt = "$5$" . "rounds=50000$" . uniqid(mt_rand(), true) . "$";
	
	$hashedPassword = crypt($password, $salt);

	$query = $_SESSION["connection"]->query("INSERT INTO users SET "
		. "email = '',"
		. "username = '$username',"
		. "password = '$hashedPassword',"
		. "salt = '$salt',"
		. "exp = 0,"
		. "exp1 = 0,"
		. "exp2 = 0,"
		. "exp3 = 0,"
		. "exp4 = 0");

	$_SESSION["name"] = $username;

	if($query) {
		//for use later on Ajax thing
		echo "true";
	}

	else {
		echo "<p>" . $_SESSION["connection"]->error . "</p>";
	}