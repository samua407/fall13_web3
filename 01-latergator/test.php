<!DOCTYPE html>
<html>
<head>
<title> Later 'Gator </title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" ></script>
<script src="lib/script.js"></script>
<link rel="stylesheet" href="style/style.css" type='text/css' />
<link href='http://fonts.googleapis.com/css?family=Raleway:400,900' rel='stylesheet' type='text/css'>

</head>

<body>

<div id="header">
<div id="showToggle" class="toggle" onclick="showHeader()">&#9669;</div>
<div id="hideToggle" class="toggle" onclick="hideHeader()">&#9659;</div>

<p id="checkin"> Hey, Alex! What do you want to know more about?</p>

	<?php
	
	//adapted from: http://colinwren.com/foursquare-tutorial-part-1/
	include_once 'credentials.php';

	if($_GET['code']){
	
	
		//We need to hit up the authkey URL and get the key in JSON format
		$authkey = file_get_contents("https://foursquare.com/oauth2/access_token?client_id=".$client_id."&client_secret=".
		$secret."&grant_type=authorization_code&redirect_uri=".$redirect."&code=".$_GET['code']);
		
		//We then need to decode it and store that key in a variable (or in a database)
		$decoded_auth = json_decode($authkey,true);
		$access_token = $decoded_auth['access_token'];
		
		//we then look up whatever endpoint of the api we want
		$userinfo = file_get_contents("https://api.foursquare.com/v2/users/self?oauth_token=".$access_token);
		$checkins = file_get_contents("https://api.foursquare.com/v2/users/self/checkins?oauth_token=".$access_token);
		
		$decoded_userinfo = json_decode($userinfo, true);
		$name = $decoded_userinfo['response']['user']['firstName'];
		$decoded_checkins = json_decode($checkins, true);
		
		//var_dump($userinfo);
		
		for($i = 0; $i < 10; $i++){
		
			//pull info for last ten check-ins
			$lastCheckin_name[$i] = $decoded_checkins['response']['checkins']['items'][$i]['venue']['name'];
			$lastCheckin_city[$i] = $decoded_checkins['response']['checkins']['items'][$i]['venue']['location']['city'];
			$lastCheckin_state[$i] = $decoded_checkins['response']['checkins']['items'][$i]['venue']['location']['state'];
			$lastCheckin_shout[$i] = $decoded_checkins['response']['checkins']['items'][$i]['shout'];
			$lastCheckin_category[$i] = $decoded_checkins['response']['checkins']['items'][$i]['venue']['categories'][0]['name'];
			$lastCheckin_shout[$i] = $decoded_checkins['response']['checkins']['items'][$i]['shout'];

			
		}
		
		
		//	echo $lastCheckin_city[1];
		//	echo 'hello';
			echo '<ul id="checkin" class="';
			echo 0;
			echo '"> <li id="type_';
			echo 0;
			echo '" class="hidden">';
			echo $lastCheckin_category[0];
			echo '</li><li id="city_';
			echo 0;
			echo '" class="hidden">';
			echo $lastCheckin_city[0];
			echo '</li><li onClick="getCheckin(';
			echo 0;
			echo ')">';
			echo $lastCheckin_name[0];
			echo '</li></ul>';


	}	
	
	
	?>

</div>

<div id="news">
	<!-- 	The news populated will go here. -->
</div>


</body>

</html>
