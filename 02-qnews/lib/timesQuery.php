

<?php

	$SEARCHONE = $_GET["s1"];
	$SEARCHTWO = $_GET["s2"];

	$key = '865c322198d103bad69aea3ba09dbf7d:9:50556460';

	define('API_KEY', $key);
	define ('SEARCHONE', $SEARCHONE);
	define ('SEARCHTWO', $SEARCHONE);
	
	$url  = 'http://api.nytimes.com/svc/search/v2/articlesearch.json';
	// $url .= '?query= des_facet:[POLITICS AND GOVERNMENT]&fields=title,date,body,publication_year';
	$url .= '?q=' . SEARCHONE;
	$url .= '+' . SEARCHTWO;
	$url .= '&page=0';
	/* $url .= '&sort=newest'; */
	$url .= '&api-key='. API_KEY;


	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_TIMEOUT, 30);
	$response = curl_exec($ch);

	
	//------decode results
	$results = json_decode($response, true);
	//var_dump($results);
	$results = $results['response']['docs'];

	//var_dump($results);

	//------get number of results
	$num = count($results);


	//------pull out variables
	
	for ($i = 1; $i <= $num; $i++) {
	
	
		$head[$i] = $results[$i]['headline']['main'];
		$section[$i] = $results[$i]['section_name'];
		$type[$i] = $results[$i]['type_of_material'];
		$snippet[$i] = $results[$i]['snippet'];
		$web_url[$i] = $results[$i]['web_url'];
		$date[$i] = $results[$i]['pub_date'];
		$numKeywords[$i] = count($keywords[$i]);
		$keyword_one[$i] = $results[$i]['keywords'][0]['value'];
		$keyword_two[$i] = $results[$i]['keywords'][1]['value'];
		$keyword_three[$i] = $results[$i]['keywords'][2]['value'];



		echo '<div class="article" id="';
		echo $i;
		echo '"><h1>';
		echo $head[$i];
		echo '</h1><h2>';
		echo $date[$i];
		echo '</h2><p>';
		echo $snippet[$i];
		echo '</p><h3><a href="';
		echo $web_url[$i];
		echo '" target="_blank">View Article</a></h3><h4>';
		echo '<button id="keyword_one">';
		echo $keyword_one[$i];
		echo '</button><button id="keyword_two">';
		echo $keyword_two[$i];
		echo '</button><button id="keyword_three">';
		echo $keyword_three[$i];
		echo '</button></h4></div>';

	
	}
	
	exit();	
?>


