<?php
	require_once(__DIR__ . "/../model/config.php");
	//session variable
	unset($_SESSION["authenticated"]);
	//eliminates the session a user has created when logged on
	session_destroy();
	header("Location: " . $path . "journal.php");