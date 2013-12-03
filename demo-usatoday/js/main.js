	

//---Trigger Button
 
$('#startajax').on('click', function(event) {
    event.preventDefault();
	
	//--var tag = '';
	//--tag = $('.tag').val();
	//--var key = '';
	//--key = $('.key').val();
	
    $('#startajax').text('loading...').attr("disabled", "disabled");
	
    //--loadData(tag, key);
    loadData();
});



//---Get Data

 //notes:
 //documentation: http://developer.usatoday.com/
 //http://api.usatoday.com/open/articles?tag=TAG&keyword=BANANA&api_key=8ue7fekkeqhr7qzaqxcdrfya

function loadData(){
//function loadData(tag, key) {

    var APIArticles = 'http://api.usatoday.com/open/articles?';
	var tag = '';	//Find articles based on embedded keywords.
    var key = 'banana';	//Find articles based on a USA TODAY text search query.
    
	$.ajax({
		dataType: "json", 		//XML also acceptable
		url: APIArticles,
		data: {
			tag: tag,
			keyword: key,
			encoding: 'json', 	//get rid of this for XML
			count: 15, 			//# of incoming stories. default is ten.
			limit: 365,			//stories that are no older than this many days old
			api_key: '8ue7fekkeqhr7qzaqxcdrfya', //always last
		}, 

	}) 

	
//	$.(each.)
	.success(function(data){
		
		parseData(data);	//trigger 'parseData' function
		//(helpful if you are using multiple API calls, but want to do the same thing with each)

	})
	
    .done(function() {
    	$('#startajax').css('visibility','hidden');
        console.log( "All done!" );
    
    })
    .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    });

}; // end load data


function parseData(data){

	//console.log(data);
	
	var articles = data.stories;
	var num_articles = articles.length;
	
	
	for (i=0; i<num_articles; i++){
		
		loadStory(articles[i].title, articles[i].link, articles[i].description);

		var title = articles[i].title;
		var link = articles[i].link;
		var description = articles[i].description;
		
		//console.log("title: "+title);
		//console.log("date: "+pubdate);
		//console.log("link: "+link);
		//console.log("descrip: "+description);
		
		//loadStory(title, link, description)
	}
	
}; //end parse data


function loadStory(title, link, descrip){
	var output = []; // to gather html here
	var templateA = $('.template'); // template in html
	var query_count; // total returned
	
	var template = templateA.clone();
	template.removeClass('template').addClass('story'); //.attr('onclick', 'nowActive(this)');

	template.find('h1').text(title).text();
	template.find('a').attr('href', link).attr('target', '_blank');
	template.find('p').text(descrip).text();
	
	output.push(template);	
	$('.results').append(output);

}; //end load story

















