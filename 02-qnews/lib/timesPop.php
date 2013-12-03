

<?php


	$key = 'fbababead8d669015b590031707e7114:9:50556460';
	define('API_KEY', $key);
	$url  = 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?';
	$url .= '&api-key='. API_KEY;


	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_TIMEOUT, 30);
	$response = curl_exec($ch);

	
	//------decode results
	$results = json_decode($response, true);
	//var_dump($results);
	
	
	$results = $results['results'];

//	var_dump($results);

$num = count($results);

for ($i = 0; $i <= $num; $i++) {
	
	
		$head[$i] = $results[$i]['title'];
		$section[$i] = $results[$i]['section'];
		$source[$i] = $results[$i]['source'];
		$web_url[$i] = $results[$i]['url'];
		$keywords[$i] = $results[$i]['adx_keywords'];
		$snippet[$i] = $results[$i]['abstract'];

		echo '<li class="timesPop"><h1>';
		echo $head[$i];
		echo '</h1><h2> view on <a href="';
		echo $web_url[$i];
		echo '" target="_blank" id="';
		echo $keywords[$i];
		echo '">';
		echo $source[$i];
		echo '</a></h2><h3>';
		echo 'snippet TBD';
		echo '</h3><p>';
		echo $snippet[$i];
		echo '</p></li>';
		

}


	//------get number of results
//	

	
	
	
	exit();	



	?>


