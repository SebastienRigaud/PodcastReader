window.addEventListener("load", main);

function main() {


	var feedTest = new RssFeed();
	
	document.getElementById("feedAdressPrompter").style.display = "none";
	
	feedTest.extractRssFrom("https://crossorigin.me/http://radiofrance-podcast.net/podcast09/rss_11591.xml");
	
}


function RssArticle()
{
	this.title="";
	this.linkTag="";
	this.description="";
	this.pubDate="";
	this.media="";

	
	this.buildHtmlDisplay = function()
	{
		var htmlCode="";
			
		if(this.title!=="")
		{
			htmlCode+="<h2>"
			if(this.linkTag!==""){htmlCode+="<a href='"+this.linkTag+"'>";}
			htmlCode+=this.title;
			if(this.linkTag!==""){htmlCode+="</a>";}
			if(this.pubDate!==""){htmlCode+="<span class='articleDate text-muted'> - "+this.pubDate+"</span>";}
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
		
		
		return htmlCode;
	}
	
	this.articleUpdateFromXML = function(xmlInput)
	{
		if(xmlInput.getElementsByTagName("title")[0]!=null){this.title=xmlInput.getElementsByTagName("title")[0].textContent;}
		if(xmlInput.getElementsByTagName("link")[0]!=null){this.linkTag=xmlInput.getElementsByTagName("link")[0].textContent;}
		if(xmlInput.getElementsByTagName("description")[0]!=null){this.description=xmlInput.getElementsByTagName("description")[0].textContent;}
		if(xmlInput.getElementsByTagName("pubDate")[0]!=null){this.pubDate=xmlInput.getElementsByTagName("pubDate")[0].textContent;}
		
		if(xmlInput.getElementsByTagName("enclosure")[0]!=null)
		{
			this.media=	"<audio controls preload='none' src='"+
						xmlInput.getElementsByTagName("enclosure")[0].getAttribute("url")+
						"' type='"+
						xmlInput.getElementsByTagName("enclosure")[0].getAttribute("type")+
						"'>Your browser do not support HTML5 audio tag :(</audio>";
			
		
		}
		
	}
}


function RssFeed()
{
	this.feed = new Array();
	this.title = "";
	this.linkTag = "";
	this.description = "";
	
	
	this.addArticle = function(article)
	{
		this.feed.push(article);
	}
	
	this.display = function()
	{
		document.getElementById("rssHeader").innerHTML = "<div class='row'><div class='col-md-2'></div><div class='col-md-8'><h1><a href='"+this.linkTag+"'>"+this.title+"</a></h1></div></div>";
		document.getElementById("rssHeader").innerHTML += "<div class='row'><div class='col-md-2'></div><div class='col-md-8'><p id='feedDescription'>"+this.description+"</p></div></div>";
		
		document.getElementById("rssFeed").innerHTML = "";
		for(var article of this.feed)
		{
			document.getElementById("rssFeed").innerHTML += "<div class='row'><div class='col-md-2'></div><div class='feedElem col-md-8'>"+article.buildHtmlDisplay()+"</div></div>";
		}
		
	}
	
	this.extractRssFrom = function(fileUrl)
	{
		var req = new XMLHttpRequest();
		req.open("GET",fileUrl);
		
		
		
		var objectReference = this;
		
		req.onreadystatechange = function() {
			 if(req.readyState === 4)
			{
				if(req.status === 200)
				{
					
					objectReference.feedUpdateFromXML(req.responseXML);
				}
				else
				{
					console.log("failed");
				}
			}
		
		}
	
		req.send();
	}
	
	this.feedUpdateFromXML = function(xmlInput)
	{
		if(xmlInput!=null)
		{
			this.title=xmlInput.getElementsByTagName("title")[0].textContent;
			this.linkTag=xmlInput.getElementsByTagName("link")[0].textContent;
			this.description=xmlInput.getElementsByTagName("description")[0].textContent;
		
			articlesList = xmlInput.getElementsByTagName("item");
			
			var i=0;
			
			for(var elem of articlesList)
			{
				var article = new RssArticle()
				article.articleUpdateFromXML(elem);
				this.addArticle(article);
				i++;
				if(i>20)
				{
					break;
				}
			}
			
			this.display();
		}
	}
	
	
}