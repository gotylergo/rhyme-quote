<?php
$con = mysql_connect('mysql.tylerjustyn.com','tjquotesdb','CRv15k8DQjzy');
mysql_select_db('tylerjustynquotes');

$data = '{}'; // json string

if(isset($_REQUEST['q'])){
	$search = $_REQUEST['q'];
	$q = mysql_query("select * from quotes where quote LIKE '% {$search}.'");
	$results = [];
	while ($row = mysql_fetch_object($q)) {
		$result = [];
		$result['quote'] = $row->quote;
		$result['author'] = $row->author;
		$results[] = $result;
	}
	$data = json_encode($results);
}

if(array_key_exists('callback', $_GET)){

    header('Content-Type: text/javascript; charset=utf8');
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Max-Age: 3628800');
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

    $callback = $_GET['callback'];
    echo $callback.'('.$data.')';

}else{
    // normal JSON string
    header('Content-Type: application/json; charset=utf8');

    echo $data;
}
