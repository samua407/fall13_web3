

/**
 * button to trigger data from api
 *
 */
 
$('#startajax').on('click', function(event) {
    event.preventDefault();
    console.log('button clicked');
    $('#startajax').text('loading...').attr("disabled", "disabled");
    loadData();
});



/**
 * get data via API
 *
 */

function loadData() {
    console.log('loadData()');

    var items = [];

    var APIArticles = 'http://api.usatoday.com/open/articles?';
	var tag = '';
	var key = 'pizza';
      
    
    $.ajax({
	    dataType: "json",
	    url: APIArticles,
	    data: {
		    tag: tag,
		    keyword: key,
		    encoding: 'json',
		    count: 15,
		    limit: 365,
		    api_key: '8ue7fekkeqhr7qzaqxcdrfya',
	    },
    })
    
    .success(function(data){
	    
	    //console.log(data);
	    parseData(data);
	    
    })
    
    
    
    .done(function() {
        console.log( "second success! getJSON is done." );
    })
    .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
    })    
    .always(function() {
        // run this stuff after, regardless of success or failure
    });

}; // END loadData()


function parseData(data){
	
	var articles = data.stories;
	var num_articles = articles.length;
	
	console.log(num_articles);
	
	for(i=0; i<num_articles; i++){
		
	loadStory(articles[i].title, articles[i].link, articles[i].description);
		

	}
	
};


function loadStory(title, link, descrip){
	
	var output = [];
	var templateA = $('.template');
	
	var template = templateA.clone();
	template.removeClass('template').addClass('story');
	
	template.find('h1').text(title);
	template.find('a').attr('href', link).attr('target', '_blank');
	template.find('p').text(descrip);
	
	output.push(template);
	$('.results').append(output);
	
};


































