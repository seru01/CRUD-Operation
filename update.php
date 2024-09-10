<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "salesdb";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve POST data
$personID = $_POST['personID'];
$personName = $_POST['personName'];
$itemA = $_POST['itemA'];
$itemB = $_POST['itemB'];
$itemC = $_POST['itemC'];
$itemD = $_POST['itemD'];

// Calculate itemTotal
$itemTotal = $itemA + $itemB + $itemC + $itemD;

// Update query
$sql = "UPDATE SalesPersons 
        SET personName = ?, itemA = ?, itemB = ?, itemC = ?, itemD = ?, itemTotal = ? 
        WHERE personID = ?";

// Prepare statement
$stmt = $conn->prepare($sql);

// Bind parameters: 's' for string, 'i' for integer, with 'i' for the last integer parameter (personID)
$stmt->bind_param("siiiiii", $personName, $itemA, $itemB, $itemC, $itemD, $itemTotal, $personID);

// Execute statement
if ($stmt->execute()) {
    echo "Record updated successfully";
} else {
    echo "Error updating record: " . $stmt->error;
}

// Close statement and connection
$stmt->close();
$conn->close();
?>
