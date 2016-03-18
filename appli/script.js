window.addEventListener("load", main);

function main() {


	var feedTest = new RssFeed("Le Bon Test","test.html","El Bueno Teste Del La Fonctionalita");
	var articleTest = new RssArticle("Le premier article","aled.jpg","C'est la bonne bite du cul","18/03/2016","<video controls><source src='https://pbs.twimg.com/tweet_video/CdzBkN4UkAAxcLf.mp4' type='video/mp4' /></video>");
	feedTest.addArticle(articleTest);
	feedTest.display();
	
}


function RssArticle(title,linkTag,description,pubDate,media)
{
	this.title=title;
	this.linkTag=linkTag;
	this.description=description;
	this.pubDate=pubDate;
	this.media=media;

	
	this.buildHtmlDisplay = function()
	{
		var htmlCode="";
			
		if(this.title!=="")
		{
			htmlCode+="<h2>"
			if(linkTag!==""){htmlCode+="<a href='"+this.linkTag+"'>";}
			console.log(htmlCode);
			htmlCode+=this.title;
			if(linkTag!==""){htmlCode+="</a>";}
			htmlCode+="</h2>";
		}
		
		if(this.media!=="")
		{
			htmlCode+=this.media;
		}
		
		if(this.description!=="")
		{
			htmlCode+="<p class='description'>"+this.description+"</p>";
		}
		
		if(this.pubDate!=="")
		{
			htmlCode+="<div class='articleDate'>"+this.pubDate+"</div>";
		}
		
		return htmlCode;
	}
	
}


function RssFeed(title,linkTag,description)
{
	this.feed = new Array();
	this.title = title;
	this.linkTag = linkTag;
	this.description = description;
	
	
	this.addArticle = function(article)
	{
		this.feed.push(article);
	}
	
	this.display = function()
	{
		document.getElementById("rssHeader").innerHTML = "<h2><a href='"+this.linkTag+"'>"+this.title+"</a></h2>";
		document.getElementById("rssHeader").innerHTML += "<p id='feedDescription'>"+this.description+"</p>";
		
		document.getElementById("rssFeed").innerHTML = "";
		for(var article of this.feed)
		{
			document.getElementById("rssFeed").innerHTML += "<div class='feedElem'>"+article.buildHtmlDisplay()+"</div>";
		}
	}
	
}