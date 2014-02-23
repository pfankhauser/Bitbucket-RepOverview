<?php

// Get the http.php file from
// http://www.phpclasses.org/httpclient
require('httpclient/http.php');

// Get the OAuth-API from
// http://www.phpclasses.org/package/7700-PHP-Authorize-and-access-APIs-using-OAuth.html
require('oauth-api/oauth_client.php');

// OAuth key (id) and secret
define("ID", "");
define("SECRET", "");

// Settings
define("BITBUCKET_BASE_URL", "https://bitbucket.org/");
define("WIKI_URL", "/wiki/Home");
define("MAX_DESCRIPTION_LENGTH", 80);

if(getData($user, $repositories, $error))
{
	//echo '<pre>', HtmlSpecialChars(print_r($user, 1)), '</pre>';
	generateTable($repositories, $table);
	include('frontend/overview.html');
}
else
{
	echo 'OAuth client error: ', HtmlSpecialChars($error);
}

/////////////////////////////////////////////////////////////////
// Establish OAuth connection and request data
/////////////////////////////////////////////////////////////////
function getData(&$user, &$repositories, &$error)
{
	$client = new oauth_client_class;
	$client->debug = false;
	$client->debug_http = false;
	$client->server = 'Bitbucket';
	$client->redirect_uri = 'http://'.$_SERVER['HTTP_HOST'].
		dirname(strtok($_SERVER['REQUEST_URI'],'?')).'overview.php';

	$client->client_id = ID;
	$application_line = __LINE__;
	$client->client_secret = SECRET;

	if(strlen($client->client_id) == 0
	|| strlen($client->client_secret) == 0)
		die('Please go to Bitbucket page to Manage Account '.
			'https://bitbucket.org/account/ , click on Integrated Applications, '.
			'then Add Consumer, and in the line '.$application_line.
			' set the client_id with Key and client_secret with Secret.'.
			'The URL must be '.$client->redirect_uri);

	if(($success = $client->Initialize()))
	{
		if(($success = $client->Process()))
		{
			if(strlen($client->access_token))
			{
				$success = $success && $client->CallAPI(
					'https://api.bitbucket.org/1.0/user/', 
					'GET', array(), array('FailOnAccessError'=>true), $user);
			
				$success = $success && $client->CallAPI(
					'https://bitbucket.org/api/1.0/user/repositories/', 
					'GET', array(), array('FailOnAccessError'=>true), $repositories);
			}
		}
		$success = $client->Finalize($success);
	}
	
	if($client->exit)
		exit;
		
	if($success)
	{
		return true;
	}
	else
	{
		$error = $client->error;
		return false;
	}
}

/////////////////////////////////////////////////////////////////
// Generate data for the overview table
/////////////////////////////////////////////////////////////////
function generateTable(&$repositories, &$table)
{
	// Copy and format data
	$i = 0;
	foreach ($repositories as &$repository) {
		$table[$i] = new StdClass;
		$table[$i]->name = HtmlSpecialChars($repository->name);
		$table[$i]->avatar = HtmlSpecialChars(str_replace('16.png', '32.png', $repository->logo));
		
		$table[$i]->description = HtmlSpecialChars($repository->description);
		if (strlen($table[$i]->description) > MAX_DESCRIPTION_LENGTH) 
		{
			$table[$i]->description = wordwrap($table[$i]->description, MAX_DESCRIPTION_LENGTH, ' ...');
			$table[$i]->description = substr($table[$i]->description, 0, strpos($table[$i]->description, ' ...') + 4);
		}

		$table[$i]->owner = $repository->owner;
		$table[$i]->timestamp = HtmlSpecialChars($repository->utc_last_updated);
		$table[$i]->date = substr($table[$i]->timestamp, 0, 10); // TODO Better convert to local time.
		$table[$i]->id = HtmlSpecialChars($repository->owner).'/'.HtmlSpecialChars($repository->slug);
		$table[$i]->url = BITBUCKET_BASE_URL.$table[$i]->id;
		$table[$i]->isPrivate = $repository->is_private;
		$table[$i]->hasWiki = $repository->has_wiki;
		$table[$i]->wikiUrl = $table[$i]->url.WIKI_URL;
		$table[$i]->hasIssues = $repository->has_issues;
		$table[$i]->isFork = $repository->is_fork;
		
		$i++;
	}
	
	// Sort table
	usort($table, function($a, $b) { return strcasecmp($a->name, $b->name); });
}
	
?>