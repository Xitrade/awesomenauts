<?php
// oop = (o)bject (o)riented (p)rograming
//Classes are used to make objects
//when we write functions we have to call every single thing
//when we write classes we can store multiple variables to replace all the functions we called
class Database {
	private $connection;
	//the "private" command means we can only see these things in this file
	private $host;
	private $username;
	private $password;
	private $database;
	public $error;
	//variables can be accessed thru this class
	//__construct defines our constructors.
	//Its called on an object after it has been created
	public function __construct($host, $username, $password, $database) {
		$this->host = $host;
		$this->username = $username;
		$this->password = $password;
		$this->database = $database;

	$this->connection = new mysqli($this->host, $this->username, $this->password);

	if($this->connection->connect_error) {
		die("Error: " . $this->connection->connect_error); //tells program to die off
	}
	
	$exists = $this->connection->select_db($database);

	if(!$exists) {
		$query = $this->connection->query("CREATE DATABASE $database");

		if ($query) {
			echo "Successfully created database: " . $database;
		}
	}
	else{
		echo "";
	}

	}
	//opens connection to the public
	public function openConnection() {
		$this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);

		if($this->connection->connect_error) {
			die("Error: " . $this->connection->connect_error); //tells program to die off
		}
	

	}
	//close connection
	public function closeConnection() {
		//checks if a variable has been set or not
		//checks if there is info in a variable
		if(isset($this->connection)) {
			$this->connection->close();

		}
	}
	//adds data to a database
	public function query($string) {
		$this->openConnection();
		
		$query = $this->connection->query($string);

		if(!$query) {
			$this->error = $this->connection->error;
		}

		$this->closeConnection();

		return $query;
	}

}

?>