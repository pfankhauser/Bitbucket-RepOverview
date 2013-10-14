// Copyright (c) 2013 Péter Fankhauser, http://designfankhauser.ch
// Source available at: https://github.com/pfankhauser/Bitbucket-RepOverview

/////////////////////////////////////////////////////////////////
// Load jQuery
/////////////////////////////////////////////////////////////////

(function($) {

// The minimum version of jQuery we want
var minimumJqueryVersion = "2.0.3";

// Check prior inclusion and version
if (window.jQuery === undefined || window.jQuery.fn.jquery < minimumJqueryVersion)
{
	var done = false;
	var script = document.createElement("script");
	//script.src = "https://ajax.googleapis.com/ajax/libs/jquery/" + minimumJqueryVersion + "/jquery.js";
	script.src = "https://ajax.googleapis.com/ajax/libs/jquery/" + minimumJqueryVersion + "/jquery.min.js";
	script.onload = script.onreadystatechange = function(){
		if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
			done = true;
			initRepOverview();
		}
	};
	document.getElementsByTagName("head")[0].appendChild(script);
}
else
{
	// Start RepOverview
	initRepOverview();
}

})(jQuery);



/////////////////////////////////////////////////////////////////
// Initialize RepOverview
/////////////////////////////////////////////////////////////////
function initRepOverview() { (function()
{	
	checkBrowser();
	applyStylesheet();
	writeStructure();
	writeTable();
	initializeUserInteraction();
	activateSearch();
	loadDetails();

})(jQuery);}



/////////////////////////////////////////////////////////////////
// Load browser information
/////////////////////////////////////////////////////////////////
function checkBrowser() { (function()
{	
	jQuery.browser = {};
	jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
	jQuery.browser.webkit = /webkit/.test(navigator.userAgent.toLowerCase());
	jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
	jQuery.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());
})(jQuery);}



/////////////////////////////////////////////////////////////////
// Write HTML structure to website
/////////////////////////////////////////////////////////////////
function writeStructure() { (function()
{	
	var windowHeight = $(window).height();
	
	if(jQuery.browser.mozilla) bodyElement = $("body, html")
	else bodyElement = $("body")
	var topPosition = $(bodyElement).scrollTop();
	
	$('body').css('overflow','hidden');
	$('#page').before($('<div></div>').attr('id', 'repOverview'));
	$("#repOverview").hide();
	$("#repOverview").css('top', topPosition + 'px');
	$("#repOverview").height(windowHeight);
	$("#repOverview").append($('<div></div>').attr('id', 'repOverviewHeader'));
	$("#repOverviewHeader").css('top', topPosition + 'px');
	$("#repOverviewHeader").append("<input type='text' id='repOverviewSearch' name='repOverviewSearch' />");
	$("#repOverview").fadeIn();
})(jQuery);}



/////////////////////////////////////////////////////////////////
// Create table and fill in data
/////////////////////////////////////////////////////////////////
function writeTable() { (function()
{	
	// Parse table content from current site
	var tableContent = [];
	
	$("article.repository").each(function(index, element)
	{
		tableContent.push({
			avatar: $(this).children("a.repo-avatar-container").children("img").wrap('<span>').parent().html(),
			name: $(this).children("h1").html(),
			description: $(this).children(".description").html(),
			time: $(this).find("time").wrap('<span>').parent().html()
		});
	});
	
	// Sort table by name
	tableContent.sort(function(a, b)
	{
    	return ((a.name < b.name) ? -1 : ((a.name == b.name) ? 0 : 1));
	});
	
	// Generating HTML for table
	var table = $('<table></table>').attr('id', 'repOverviewTable');
	var columnClasses = {
		avatar: 'repOverviewColumnAvatar',
		name: 'repOverviewColumnName',
		description: 'repOverviewColumnDescription',
		time: 'repOverviewColumnTime'};
	
	for (var i in tableContent)
	{
		var row = $('<tr></tr>');
		for (var key in tableContent[i])
		{
    		row.append($('<td></td>').html(tableContent[i][key]).addClass(columnClasses[key]));
  		}
		table.append(row);
	}
	
	// Write to website
	$('#repOverview').append(table);
	
})(jQuery);}



/////////////////////////////////////////////////////////////////
// User interaction
/////////////////////////////////////////////////////////////////
function initializeUserInteraction() { (function()
{	
	// Table row hover background
	$("#repOverviewTable tr").hover(
	function(){
		$(this).css("background", "rgba(65,169,243,0.3)");
	}, 
	function(){
		$(this).css("background", "");
	});
	
})(jQuery);}



/////////////////////////////////////////////////////////////////
// Load details
/////////////////////////////////////////////////////////////////
function loadDetails() { (function()
{	
	$("table#repOverviewTable tr").each(function(index, element)
	{
		var currentRow = $(this);
		var wikiUrl = currentRow.find("a.repo-link").attr('href') + '/wiki/Home';
		$.get(wikiUrl, function(currentRow) {})
		.done(function(data)
		{
			var wikiFirstParagraph = $(data).find('section#wiki-content p').first().text();
			var defaultWikiText = "Welcome to your wiki! This is the default page we've installed for your convenience. Go ahead and edit it.";
			var wikiLinkHtml;
			
			if (wikiFirstParagraph == defaultWikiText)
			{
				wikiLinkHtml = '<a href="' + wikiUrl + '">(W)</a>';
			}
			else
			{
				wikiLinkHtml = '<a href="' + wikiUrl + '">W</a>';
			}

			currentRow.append($('<td></td>').html(wikiLinkHtml));
		})
	});

})(jQuery);}



/////////////////////////////////////////////////////////////////
// Search
/////////////////////////////////////////////////////////////////
function activateSearch() { (function()
{	
	// Set focus on search file
	$('#repOverviewSearch').focus();

	// Execute search (handler)
	$('#repOverviewSearch').on('keyup', function(){
		// Helper function for case insesitive search
		$.expr[':'].Contains = function(a, i, m) {
			return $(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
		};
	
	  // Only search when there are 3 or more characters in the search query
	  if ($('#repOverviewSearch').val().length > 0)
	  {
			$('#repOverviewTable tr').hide();
			$('#repOverviewTable tr td:Contains(\'' + jQuery('#repOverviewSearch').val() + '\')').parent().show();
	  }
	  else if (jQuery('#repOverviewSearch').val().length == 0)
	  {
			// Reset search
		  $('#repOverviewSearch').val('');
		  $('#repOverviewTable tr').show();
			$('#repOverviewSearch').focus();
		}
 
		// If there were no matching rows, tell the user
    if (jQuery('#repOverviewTable tr:visible').length == 0) {

    }
    
	});
	
})(jQuery);}



/////////////////////////////////////////////////////////////////
// Exit
/////////////////////////////////////////////////////////////////
$(document).keyup(function(e)
{ 
  if (e.keyCode == 27) // Esc key
  {
  	// Remove HTML/CSS elements
		$("#repOverview").fadeOut(function() {
			$("#repOverview").remove();
		});
	$('body').css('overflow', 'scroll');
  }
});



/////////////////////////////////////////////////////////////////
// Windows resize
/////////////////////////////////////////////////////////////////
$(window).resize(function()
{
	var windowHeight = $(window).height();
	$("#repOverview").height(windowHeight);
});



/////////////////////////////////////////////////////////////////
// Load/apply Stylesheet
/////////////////////////////////////////////////////////////////
function applyStylesheet() { (function()
{
	// RELEASE: Comment this out
	$("head").append("<link>");
	var css = $("head").children(":last");
	css.attr({
	      rel:  "stylesheet",
	      type: "text/css",
	      href: "http://designfankhauser.ch/bitbucket_repoverview/stylesheet.css?v=" + Math.random()
	});

	// RELEASE: Comment in, Copy minified CSS
	//css = 'MINIFIED CSS GOES HERE';
	//$("head").append("<style type='text/css'>" + css + "</style>");
	
})(jQuery);}