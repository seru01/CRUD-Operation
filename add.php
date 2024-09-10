<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "salesdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$personName = $_POST['personName'];
$itemA = $_POST['itemA'];
$itemB = $_POST['itemB'];
$itemC = $_POST['itemC'];
$itemD = $_POST['itemD'];

$sql = "INSERT INTO SalesPersons (personName, itemA, itemB, itemC, itemD) 
        VALUES ('$personName', $itemA, $itemB, $itemC, $itemD)";

if ($conn->query($sql) === TRUE) {
    header('Location: index.html');
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
