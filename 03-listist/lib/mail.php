<?php

$email = $_GET[email];
$ingreds = $_GET[ingreds];
$name = $_GET[name];
$url = $_GET[url];


$subject = 'Shopping List for ' .$name;

$messageBody = 'Craving <a href="' .$url . '" target="_blank">' . $name . '</a>? <br> <br> <strong>You need... </strong><br>' . $ingreds;

$headers = "From:" . $email . "\r\n" . 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=iso-8859-1' . "\r\n"; 



mail($email,$subject,$messageBody,$headers);

echo "Ingredients sent!";

?>
