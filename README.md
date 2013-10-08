Bitbucket RepOverview
=====================

This is a bookmarklet to get a nice overview of all your Bitbucket repositories.


```javascript
javascript:(function(){var s=document.createElement('script');s.src = encodeURI('https://raw.github.com/pfankhauser/Bitbucket-RepOverview/master/bitbucket_repoverview.min.js');document.body.appendChild(s);})();
```

For debugging:

```javascript
javascript:(function(){
	var script=document.createElement('script');
		script.src = encodeURI(
			'http://designfankhauser.ch/bitbucket_repoverview/bitbucket_repoverview.js?v='+Math.random()
		);
	document.body.appendChild(script);
})();
```

## Credits
- [jQuery Loader](http://coding.smashingmagazine.com/2010/05/23/make-your-own-bookmarklets-with-jquery/)
- [Overlay div](http://css-tricks.com/snippets/jquery/append-site-overlay-div/)
- [Table search 1](http://www.willstrohl.com/Blog/PostId/468/Using-jQuery-to-Search-an-HTML-Table)
- [Table search 2](https://gist.github.com/jakebresnehan/2288330)
