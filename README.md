Bitbucket RepOverview
=====================

This is a bookmarklet to get a nice overview of all your Bitbucket repositories.


```javascript
javascript:(function(){var%20s=document.createElement('script');s.src%20=%20encodeURI('https://raw.github.com/pfankhauser/Bitbucket-RepOverview/master/bitbucket_repoverview.min.js');document.body.appendChild(s);})();
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
- [Javascript/CSS Compression](http://refresh-sf.com/yui/)
