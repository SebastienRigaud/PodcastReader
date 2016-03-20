window.addEventListener("load", main);

function main() {


	
	document.getElementById("submitUrl").addEventListener("click",function(){
		location.hash=document.getElementById("feedUrl").value;
		location.reload(true);		
	});

	if(location.hash!="")
	{
		openFeed(location.hash.substring(1))
	}
}

function validUrl(UrlTest) //Function taken from : http://memo-web.fr/categorie-javascript-228.php
{
 
   var regexp = new RegExp("^((http|https):\/\/){1}(www[.])?([a-zA-Z0-9]|-)+([.][a-zA-Z0-9(-|\/|=|?)?]+)+$");
   
  return regexp.test(UrlTest);
}

function openFeed(feedUrl)
{
	if(!validUrl(feedUrl))
	{
		document.getElementById("urlErrorReport").style.display = "block";
	}
	else
	{
		document.getElementById("feedAdressPrompter").style.display = "none";
		document.getElementById("loading").style.display = "block";
		var feed = new RssFeed();
		feed.extractRssFrom(feedUrl);
	}
}


function RssArticle()
{
	this.title="";
	this.linkTag="";
	this.description="";
	this.pubDate="";
	this.mediaUrl="";
	this.mediaType="";
	this.mediaId=0;
	
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
			var mediaHtml =	"<audio controls preload='none' src='"+
							this.mediaUrl+
							"' type='"+
							this.mediaType+
							"' id='"+
							"media"+this.mediaId+
							"'>Your browser do not support HTML5 audio tag :(</audio>";
			
		
			htmlCode+=mediaHtml;
		}
		
		if(this.description!=="")
		{
			htmlCode+="<p class='description'>"+this.description+"</p>";
		}
		
		
		return htmlCode;
	}
	
	this.articleUpdateFromXML = function(xmlInput,mediaId)
	{
		this.mediaId=mediaId;
		if(xmlInput.getElementsByTagName("title")[0]!=null){this.title=xmlInput.getElementsByTagName("title")[0].textContent;}
		if(xmlInput.getElementsByTagName("link")[0]!=null){this.linkTag=xmlInput.getElementsByTagName("link")[0].textContent;}
		if(xmlInput.getElementsByTagName("description")[0]!=null){this.description=xmlInput.getElementsByTagName("description")[0].textContent;}
		if(xmlInput.getElementsByTagName("pubDate")[0]!=null){this.pubDate=xmlInput.getElementsByTagName("pubDate")[0].textContent;}
		
		if(xmlInput.getElementsByTagName("enclosure")[0]!=null)
		{
			this.mediaUrl=xmlInput.getElementsByTagName("enclosure")[0].getAttribute("url");
			this.mediaType=xmlInput.getElementsByTagName("enclosure")[0].getAttribute("type");
		}
		
	}
	
	this.attachPlayEvent = function()
	{
		document.getElementById("media"+this.mediaId).addEventListener("play",function(){
			var audios = document.getElementsByTagName("audio");
			for(var elem of audios)
			{
				if(elem!=this){elem.pause();}
			}
			
			var videos = document.getElementsByTagName("video");
			for(var elem of videos)
			{
				if(elem!=this){elem.pause();}
			}
			
			
		});
	}
}


function RssFeed()
{
	this.feed = new Array();
	this.displayOffset = 0;
	this.title = "";
	this.linkTag = "";
	this.description = "";
	
	var objectReference = this;
			
	document.getElementById("olderButton").addEventListener("click",function(){objectReference.displayOlder();});
	document.getElementById("newerButton").addEventListener("click",function(){objectReference.displayNewer();});
	document.getElementById("newerButton").disabled=true;
	document.getElementById("olderButton").disabled=false;
	
	
	
	this.addArticle = function(article)
	{
		this.feed.push(article);
	}
	
	
	this.display = function()
	{
		document.getElementById("rssHeader").innerHTML = "<div class='row'><div class='col-md-2'></div><div class='col-md-8'><h1><a href='"+this.linkTag+"'>"+this.title+"</a></h1></div></div>";
		document.getElementById("rssHeader").innerHTML += "<div class='row'><div class='col-md-2'></div><div class='col-md-8'><p id='feedDescription'>"+this.description+"</p></div></div>";
		
		document.getElementById("rssFeed").innerHTML = "";
		for(var i=this.displayOffset;i<this.displayOffset+10;i++)
		{
			
			if(this.feed[i]!=null)
			{
				document.getElementById("rssFeed").innerHTML += "<div class='row'><div class='col-md-2'></div><div class='feedElem col-md-8'>"+this.feed[i].buildHtmlDisplay()+"</div></div>";
			}
		}
				
		document.getElementById("fluxContainer").style.display = "block";
		document.getElementById("loading").style.display = "none";
		
		
		
		for(var i=0;i<10;i++)
		{
			var id=i+this.displayOffset;
			if(document.getElementById("media"+id)!=null)
			{
				this.feed[id].attachPlayEvent();
			}
		}
		
		var videos = document.getElementsByTagName("video");
		for(var elem of videos)
		{
			elem.addEventListener("playing",function(){objectReference.playMedia(elem);});
		}
		
	}
		
	this.displayOlder = function()
	{
		if(this.displayOffset+10<this.feed.length)
		{
			this.displayOffset += 10;
			this.display();
			document.getElementById("newerButton").disabled=false;
			
		}
		
		if(this.displayOffset+10>this.feed.length)
		{
			document.getElementById("olderButton").disabled=true;
		}
	}
	
	this.displayNewer = function()
	{
		if(this.displayOffset-10>=0)
		{
			this.displayOffset -= 10;
			this.display();
			document.getElementById("olderButton").disabled=false;
		}
		if(this.displayOffset-10<0)
		{
			document.getElementById("newerButton").disabled=true;
		}
		
	}

	
	
	this.extractRssFrom = function(fileUrl)
	{
		var req = new XMLHttpRequest();
		req.open("GET","https://crossorigin.me/"+fileUrl);
		
		
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
		
			var articlesList = xmlInput.getElementsByTagName("item");
			
			var mediaId=0;
			
			for(var elem of articlesList)
			{
				var article = new RssArticle()
				article.articleUpdateFromXML(elem,mediaId);
				this.addArticle(article);
				mediaId++;
			}
			
			this.display(0);
			
		}
	}
	
	this.playMedia = function()
	{
		var audios = document.getElementsByTagName("audio");
		for(var elem of audios)
		{
			elem.pause();
		}
		
		var videos = document.getElementsByTagName("video");
		for(var elem of videos)
		{
			elem.pause();
		}
		
	}
	
	
}