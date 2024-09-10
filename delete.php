<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "salesdb";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$personID = $_GET['id'];

$sql = "DELETE FROM SalesPersons WHERE personID = $personID";

if ($conn->query($sql) === TRUE) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . $conn->error;
}

$conn->close();
?>
