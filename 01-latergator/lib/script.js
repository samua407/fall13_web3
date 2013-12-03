$( document ).ready(function() {

	//getCheckin(0);

	document.getElementById('showToggle').style.visibility = "hidden";


});

var limit = 100;
function showHeader(){
	document.getElementById('header').style.width = '200px';
	document.getElementById('header').style.height = '175px';
	document.getElementById('hideToggle').style.visibility = "visible";
	document.getElementById('showToggle').style.visibility = "hidden";
	document.getElementById('checkin').style.visibility = "visible";

}

function hideHeader(){
	
	document.getElementById('header').style.width = '40px';
	document.getElementById('header').style.height = '34px';

	document.getElementById('hideToggle').style.visibility = "hidden";
	document.getElementById('showToggle').style.visibility = "visible";
	document.getElementById('checkin').style.visibility = "hidden";
	
}

function getCheckin(n){

	//get Type
	$(function() {
	 var type = $("#type_"+n).text();
	 var type = decodeURI(type);
	 newsReturn(type, 10);
	 });

	$(function() {
	 var city = $("#city_"+n).text();
	 var city = decodeURI(city);
	 //newsReturn(city, 10);
	 });
}


//------------News API -- HEARST

function newsReturn(searchTerm, limit){
	
	document.getElementById('news').innerHTML = '';
	getNews(searchTerm, limit);
	console.log("one successful");
	
};

function getNews(searchTerm, limit) {

	var newsAPI = "http://hearst.api.mashery.com/Article/search?";
	$.ajax({
		dataType: "jsonp",
		crossDomain: true,
		jsonp: '_callback',
		cache: true,
		url: newsAPI,
		data: {
			keywords: searchTerm,
			_pretty: 0,
			shape: "brief",
			pages: "full",
			start: 0,
			limit: limit,
			sort: "publish_date,desc",
			total: 0,
			_key: "3zt7d9xmwmpqt8bcf9wvu8kh",
		},
	})
		.done(function(objreturn) {
			console.log("received array from API");
			getNewsDetails(objreturn, limit);
		});

}; 

function getNewsDetails (newsArray, limit){

	for(var i = 0; i<limit; i++){
	
		var articleSource = newsArray.items[i].origin_site_name;
		var articleType = newsArray.items[i].article_type_name;
		var articleURL = newsArray.items[i].canonical_url;
		var articleTitle = newsArray.items[i].title;
		var articleTeaser = newsArray.items[i].promo_teaser;
//		var articleTeaser = newsArray.items[i].body;
		var articleIssueDate = newsArray.items[i].issue_date;
		var articleRelatedLinks = newsArray.items[i].related_links;
		
		//console.log(newsArray.items[i]);
		//console.log(articleSource);
		//console.log(articleType);
		//console.log(articleURL);
		//console.log(articleTitle);
		//console.log(articleTeaser);
		//console.log(articleIssueDate);
		//console.log(articleRelatedLinks);
		buildNews(i, articleTitle, articleSource, articleType, articleURL, articleTeaser);
	}// end loop
	
}; 

function buildNews (i, articleTitle, articleSource, articleType, articleURL, articleTeaser) {

	var div = document.createElement('div');
	document.getElementById("news").appendChild(div);
	//div.id="article" 
	div.setAttribute('id', 'article');
	div.setAttribute('class', 'article'+i);
	div.setAttribute('onmouseover', 'showNews('+i+')');
	div.setAttribute('onmouseout', 'hideNews('+i+')');
	div.setAttribute('onclick', 'cutNews('+i+')');
	
	
	
	var newHead = document.createElement('h1')
	newHead.innerHTML = articleTitle;
	div.appendChild( newHead );
	
	var newSource = document.createElement('h2')
	newSource.innerHTML = articleSource;
	div.appendChild( newSource );
	
/*
	var newType = document.createElement('h3')
	newType.innerHTML = articleType;
	div.appendChild( newType );
*/

	var newType = document.createElement('h4')
	newType.innerHTML = "<a href='"+articleURL+"' target='_blank'>Read Full Article</a>";
	div.appendChild( newType );

	
	var newTeaser = document.createElement('p')
	newTeaser.innerHTML = articleTeaser;
	newTeaser.setAttribute('id', 'story'+i);
	div.appendChild( newTeaser );

}; 


function showNews(n) {


document.getElementById("story"+n).style.visibility="visible";

}

function hideNews(n){
	
	var check = document.getElementById("story"+n);
    check.style.visibility="hidden";
	
}

function cutNews(n) {
	    
	$(".article"+n).remove();

}