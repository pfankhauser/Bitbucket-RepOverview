// Copyright (c) 2014 Péter Fankhauser, http://designfankhauser.ch
// Source available at: http://repoverview.designfankhauser.ch/

$( document ).ready(function() {
		initializeUserInteraction();
		activateSearch();
		//loadDetails();
});



/////////////////////////////////////////////////////////////////
// User interaction
/////////////////////////////////////////////////////////////////
function initializeUserInteraction() { (function()
{	
	// Table row hover background	
	$("table tr").hover(
	function(){
		$(this).addClass("active");
	}, 
	function(){
		$(this).removeClass();
	});
	
})(jQuery);}



/////////////////////////////////////////////////////////////////
// Search
/////////////////////////////////////////////////////////////////
function activateSearch() { (function()
{	
	// Execute search (handler)
	$('#search-input').on('keyup', function(){
		// Helper function for case insesitive search
		$.expr[':'].Contains = function(a, i, m) {
			return $(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
		};
	
	  // Only search when there are 3 or more characters in the search query
	  if ($('#search-input').val().length > 0)
	  {
	  	$("#search-reset").show();
			$('table tr').hide();
			$('table tr td:Contains(\'' + jQuery('#search-input').val() + '\')').parent().show();
	  }
	  else if (jQuery('#search-input').val().length == 0)
	  {
			// Reset search
			$("#search-reset").hide();
		  $('#search-input').val('');
		  $('table tr').show();
			$('#search-input').focus();
		}
 
		// If there were no matching rows, tell the user
    if (jQuery('table tr:visible').length == 0) {
			// TODO
    }
	});
	
	// Reset search
	$(document).keyup(function(e)
	{ 
  	if (e.keyCode == 27) // Esc key
		{
			$("#search-reset").hide();
  		$('#search-input').val('');
		  $('table tr').show();
		}
	});
	
	// On click on reset button
	$("#search-reset").click(function(event) {
    $("#search-reset").hide();
    $("#search-input").val("");
    $('table tr').show();
  });
  
  // Set focus on search file (delay necessary because of rendering issues)
	setTimeout(function() { $('#search-input').focus() } , 300);
	
})(jQuery);}



/////////////////////////////////////////////////////////////////
// Load details
/////////////////////////////////////////////////////////////////
function loadDetails() { (function()
{	
	$("table td.wiki a").each(function(index, element)
	{
		var wikiLink = $(this);
		var wikiUrl = wikiLink.attr('href');
		$.get(wikiUrl, function(wikiLink) {})
		.done(function(data)
		{
			var wikiFirstParagraph = $(data).find('section#wiki-content p').first().text();
			var defaultWikiText = "Welcome to your wiki! This is the default page we've installed for your convenience. Go ahead and edit it.";
			var wikiLinkHtml;
			
			if (wikiFirstParagraph == defaultWikiText)
			{
				wikiLink.addClass("inactive");
			}
		})
	});

})(jQuery);}
