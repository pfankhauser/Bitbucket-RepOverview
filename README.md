Bitbucket RepOverview
=====================

This is a Bookmarklet for a nice overview of all Bitbucket repositories.

To use it, drag this link to your bookmark bar: [RepOverview](javascript:(function(){
	var script=document.createElement('script');
		script.src = encodeURI(
			'http://designfankhauser.ch/bitbucket_repoverview/bitbucket_repoverview.js?v='+Math.random()
		);
	document.body.appendChild(script);
})();)

# Credits
jQuery Loader: http://coding.smashingmagazine.com/2010/05/23/make-your-own-bookmarklets-with-jquery/
Overlay div: http://css-tricks.com/snippets/jquery/append-site-overlay-div/
Table search: http://www.willstrohl.com/Blog/PostId/468/Using-jQuery-to-Search-an-HTML-Table, https://gist.github.com/jakebresnehan/2288330
