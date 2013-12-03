//---get day of the week

function headerDay(){

	var d = new Date();
	var weekday=new Array(7);
	weekday[0]="Sun.";
	weekday[1]="Mon.";
	weekday[2]="Tues.";
	weekday[3]="Wed.";
	weekday[4]="Thurs.";
	weekday[5]="Fri.";
	weekday[6]="Sat.";

	var months = new Array(7);
	months[0]="Jan.";
	months[1]="Feb.";
	months[2]="March";
	months[3]="April";
	months[4]="May";
	months[5]="June";
	months[6]="July";
	months[7]="Aug.";
	months[8]="Sept.";
	months[9]="Oct.";
	months[10]="Nov.";
	months[11]="Dec.";


	var today = weekday[d.getDay()];
	var month = months[d.getMonth()];
	var date = d.getDate();
	var minutes = d.getMinutes();
	var	hours =	d.getHours();
	
	if(minutes<10){
		minutes = "0"+minutes;
	}
	if(hours>12){hours = hours-12;}
	
	document.write("<div class='block'><div class='header'> <h1>"+hours+":"+minutes+"</h1><h2>"+month+" "+date+"</p></div></div>");
	
	var getTime =	document.getElementsByClassName('header')[0].children[0];
	var timeInterval;
	timeInterval = setInterval(function(){

		var newD = new Date();
		newMinutes = newD.getMinutes();
		newHours =	newD.getHours();
		if(newHours>12){ newHours = newHours-12;}
		if(newMinutes<10){newMinutes = "0"+newMinutes;}
		getTime.innerHTML = newHours+":"+newMinutes;

	}, 5000);

}

//---get nytimes "popular articles"

function getTimesPop(){
	

	jQuery.ajax({
	        url: "/web3/project02/lib/timesPop.php",
	        success: function(result) {
				var timesPop = result;
				//console.log(timesPop);
				var base = $('<div/>').append(timesPop).find('li.timesPop').get();
				var numStories = base.length;			
				
				//story element variables
				var timesPopHed = [];
				var timesPopLink = [];
				var timesPopKey = [];
				var timesPopStory = []; //p
				var timesPopTeaser = []; //h3 - child 2

				for ($i=0; $i<(numStories-1); $i++){ 
					var timesPopHTML = base[$i];		

					timesPopHed[$i] = timesPopHTML.children[0].innerText;
					timesPopLink[$i] = timesPopHTML.children[1].children[0].href;
					timesPopKey[$i] = timesPopHTML.children[1].children[0].id;
					timesPopStory[$i] = timesPopHTML.children[3].innerText;
					//build Teaser
					var story = timesPopStory[$i].split(' ').slice(0, 7);
					story.push('...');
					timesPopTeaser[$i] = story.toString().replace(/,/g, " ");
					
					loadStories(timesPopHed[$i], timesPopTeaser[$i], timesPopLink[$i],'New York Times', timesPopKey[$i], timesPopStory[$i]);
						  
				}
						
			},
			complete: function(){
		        
		        getDigg();
		        
	        }
		});
		
		

}
	
//---search nytimes articles
function searchNYTimes(searchOne, searchTwo) {

    window.location.href = "lib/timesQuery.php?s1=" + searchOne + "&s2=" + searchTwo;
}


//---get digg News
function getDigg(){
	
	jQuery.ajax({
	        url: "/web3/project02/lib/diggFrontPage.php",
	        success: function(result) {
				var digg = result;
				//console.log(digg);
				var base = $('<div/>').append(digg).find('div#content-main').get();
				var diggHTML = base[0].innerHTML;
				
				//get story headlines + links
				var geth2 = $('<div/>').append(diggHTML).find('h2').get();
				var diggHed = [];
				var diggKicker = [];
				var diggLink = [];
	
				var getMeta = $('<div/>').append(diggHTML).find('div.story-meta').get();
				var diggMetaPub = [];
				var diggMetaKey = [];
				
				var getStory = $('<div/>').append(diggHTML).find('div.story-content').get();
				var diggStory = [];
				//console.log(getStory[0].children);
				
				//get numStories
				var numStories = getStory.length;
				//console.log(numStories);
				
				
				//template

				for ($i=0; $i<(numStories-2); $i++){ //subtract two from num stories because last two are pop + upcoming
				
					diggHed[$i] = getStory[$i].children[0].children[1].innerText;
					diggKicker[$i] = getStory[$i].children[0].children[0].innerText;
					diggLink[$i] = geth2[$i].children[0].href;
					diggMetaPub[$i] = getMeta[$i].children[0].children[0].text;
					diggMetaKey[$i] = getMeta[$i].children[1].children[0].text;
					diggStory[$i] = getStory[$i].children[1].innerText;
					
					/*
					console.log("story number "+$i);
					console.log(diggHed[$i]);
					console.log(diggKicker[$i]);
					console.log(diggLink[$i]);
					console.log(diggMetaPub[$i]);
					console.log(diggMetaKey[$i]);
					console.log(diggStory[$i]);
					*/
	
	
					loadStories(diggHed[$i], diggKicker[$i],diggLink[$i],diggMetaPub[$i], diggMetaKey[$i], diggStory[$i]);
						  
					  
				}

	        },
	        complete: function(){
	        	$(".notice").fadeOut("slow");
		        callShuffle();
	        }
	    });
} 


//---load stories
function loadStories(hed, teaser, link, pub, key, copy){
    var output = []; // to gather html here
	var templateA = $('.newsFeed li.template'); // template in html
	var query_count; // total returned

	
	var template = templateA.clone();
	template.removeClass('template').addClass('article').attr('onclick', 'nowActive(this)');


	template.find('h1').text(hed).text();
	template.find('pub').text(pub).text();
	template.find('h3').text(teaser).text();
	template.find('p').text(copy).text();
	template.find('link').text(link).text();
	template.find('a').attr('href', link).attr('target', '_blank').attr('id', key).attr('onclick', 'addKey(this.id)');
		
	output.push(template);	
	$('.newsFeed ul').append(output);	
}	


//---shuffle stories
function callShuffle(){
	console.log('shuffle start');

	var ul = [];
	ul = $( "ul" ).get();
	var test = ul[0].children;

	shuffle(test);
}

function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;
	
	
	
	var test=document.createElement('section');
	test.setAttribute('class','liveFeed');
	var ul=document.createElement('ul');
	document.body.appendChild(test);
	test.appendChild(ul)

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
	
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;    
    ul.appendChild(array[randomIndex]);
  
  }

  return array;
 
}


//---active stories
function nowActive(current){

	var li = [];
	var activeLi = [];

	li = $('.liveFeed li.article');
	activeLi = $('.liveFeed li.active');
  	
  	for(i = 0; i < li.length; i++){
	  	li[i].className = 'article';
  	}  

  	for(i = 0; i < activeLi.length; i++){
	  	activeLi[i].className = 'article';
  	}  

  	current.className = 'active';
    
}




//---call Times, which calls Digg, which calls Shuffle + fades notice
headerDay();
getTimesPop();



