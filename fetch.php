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

$sql = "SELECT
            personID,
            personName,
            itemA,
            itemB,
            itemC,
            itemD,
            itemTotal
        FROM SalesPersons
        UNION ALL
        SELECT
            NULL AS personID,
            'Total' AS personName,
            SUM(itemA) AS itemA,
            SUM(itemB) AS itemB,
            SUM(itemC) AS itemC,
            SUM(itemD) AS itemD,
            SUM(itemTotal) AS itemTotal
        FROM SalesPersons";

$result = $conn->query($sql);

$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);

$conn->close();
?>
