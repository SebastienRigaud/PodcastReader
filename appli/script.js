window.addEventListener("load", main);

function main() {


	var feedTest = new RssFeed("Le Bon Test","test.html","El Bueno Teste Del La Fonctionalita");
	var articleTest = new RssArticle("Le premier article","aled.jpg","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non tellus dignissim, pharetra mauris ac, ultricies tellus. Praesent bibendum tempus nibh. Nullam id tortor quis elit pellentesque pharetra. Sed at urna sit amet diam congue sodales. Aenean vel leo nec tellus rhoncus pulvinar posuere et lectus. Nam consectetur, arcu efficitur tincidunt varius, felis risus vehicula orci, non tempor sem erat ac lorem. Aenean eu convallis dui. Suspendisse sit amet dapibus neque, ac egestas lorem. Sed vehicula turpis libero, vitae ullamcorper diam interdum sed. Sed et lacus at libero condimentum maximus non eget enim. Nunc ac luctus nunc. Aliquam ultricies suscipit iaculis. Aenean ultricies ex quis massa lacinia, a maximus nunc egestas. Phasellus ac nisi id libero blandit commodo. Maecenas ultrices diam mi.Morbi id fermentum magna. Vivamus gravida ante ac mi vehicula, vel auctor augue tempor. Maecenas eu blandit elit. Mauris tempus, urna in dignissim blandit, elit leo rutrum tellus, quis suscipit ligula ante sed mi. Praesent nec sem in velit tincidunt lacinia. Praesent ornare tristique lacus a finibus. Quisque scelerisque pellentesque nunc, id tincidunt nulla eleifend ac. Cras a ex laoreet, iaculis massa vel, tincidunt risus. Sed sit amet sagittis felis. Pellentesque at tortor metus. Maecenas id semper mi, in ultrices ipsum. Phasellus cursus ante porttitor nulla maximus, ut lacinia dui scelerisque. Aenean velit nisl, ornare ut lectus nec, eleifend congue felis. Proin vitae turpis vitae purus convallis tincidunt.Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce lacus sem, pharetra sed placerat eget, vestibulum sed mauris. Cras varius tristique ligula, a tempor lacus. Curabitur semper, erat consequat fringilla lobortis, mi nisl vulputate orci, eget auctor sem elit vel magna. Quisque sed imperdiet tortor. Donec ante dolor, facilisis et nulla a, vulputate maximus metus. Vivamus pellentesque dui sit amet mauris maximus porttitor. Suspendisse varius laoreet luctus. Proin id metus aliquet, ullamcorper odio sed, euismod felis. Maecenas sodales vulputate velit, dapibus cursus leo pharetra non.Aliquam elementum sodales euismod. Nulla vel fermentum lectus. Nam at quam nec libero pharetra interdum. Nam suscipit urna arcu, non efficitur sapien rutrum ac. Duis commodo dictum risus, ut tempor eros maximus non. Vestibulum faucibus nibh auctor tincidunt bibendum. Integer eleifend vulputate massa, ut rutrum mauris suscipit ac. Fusce ut dui et leo aliquet finibus. Aenean nec congue neque.","18/03/2016","<video controls><source src='https://pbs.twimg.com/tweet_video/CdzBkN4UkAAxcLf.mp4' type='video/mp4' /></video>");
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
			if(this.pubDate!==""){htmlCode+="<span class='articleDate'> - "+this.pubDate+"</span>";}
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
		document.getElementById("rssHeader").innerHTML = "<div class='row'><div class='col-md-2'></div><div class='col-md-8'><h2><a href='"+this.linkTag+"'>"+this.title+"</a></h2></div></div>";
		document.getElementById("rssHeader").innerHTML += "<div class='row'><div class='col-md-2'></div><div class='col-md-8'><p id='feedDescription'>"+this.description+"</p></div></div>";
		
		document.getElementById("rssFeed").innerHTML = "";
		for(var article of this.feed)
		{
			document.getElementById("rssFeed").innerHTML += "<div class='row'><div class='col-md-2'></div><div class='feedElem col-md-8'>"+article.buildHtmlDisplay()+"</div></div>";
		}
		
		
	}
	
}