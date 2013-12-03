



//Variables For APIs
var cartodb_accountname = 'aesam'; 
var cartodb_key = "&api_key=e344586a47e16db7281d936b31b6b1661ff3ef5d"; 
var table_name = 'qnews';
var url_cartoData = 'http://'+cartodb_accountname+'.cartodb.com/api/v2/sql?';
var notes_limit = 100;
var notes_format = 'format=GeoJSON&';


//Other Variabls
var	ip = '68.173.226.250'; //current IP
var	ID; //current ID in DB
var keywords;


//---location + ip data; current DB intery;
$.getJSON( "http://smart-ip.net/geoip-json?callback=?", function(data){  ip = data.host; }).success(function() {  //ends at end of document

	//---get current location
	function getLocation (){
		
		//on success
	     var newPosition = function(p){         
	        position = p; 
	        var lat = position.coords.latitude;
	        var lng = position.coords.longitude;
	        var newLocation = lng + ' ' + lat; // the var name location screwed everything up
	      	locationNote(newLocation, ip);

	    }
	
	    // on error
	    var positionError = function(error){ 
//	        feedback(error); 
			var browser = BrowserDetect.browser;
			
			switch(browser){
			
				case "Chrome":
				alert("Oops! We can't see where you are...");
				alert("Please go to chrome://settings/content and switch your Location preference to 'Ask me when a site tries to track my physical location.' Then, reload this page and select 'Allow'. Happy browsing!")
				break;
				
				case "Safari":
				alert("Oops! We can't see where you are...")
				alert("Please select 'Allow' when Safari asks to share your current location.")
				break;	 
				
			}

	    }
	
	    // get location from the browser
	    navigator.geolocation.getCurrentPosition(newPosition,positionError);	
	   
	}
	
	//---run getLocation
	getLocation(); 
	
}); //end of Get IP
 
	
//---post location to NEW DB entry
function locationNote (location,ip){

	var sqlInsert ="q=INSERT INTO "+ table_name +" (ip,the_geom) VALUES('"+ ip +"', ST_GeomFromText('POINT(" + location + ")', 4326) )";

   console.log('updating current ID...');
   postToDB(sqlInsert);
  // console.log('post to DB commented out');
   
};

//---get current Carto_DB ID
function getCurrentID(){ 
	
	    var sql_statement = "q=SELECT * FROM qNews ORDER BY cartodb_id";
	    var url_query = url_cartoData + notes_format + sql_statement;
	
	    var output = []; // to gather html here
	    var query_count; // total returned
	
	    $.getJSON(url_query, function(data){
	        query_count = data.features.length;
			var q = query_count-1;
			ID = data.features[q].properties.cartodb_id;	
			var currentID = JSON.stringify(ID);
			localStorage.currentID = currentID;
			console.log('the current ID is: ' +currentID);
			getCurrentKeywords(currentID);
			
	    })
	    

	    
	};
	

//---post to CartoDB
function postToDB(sql){
	    
	    var theUrl = url_cartoData + sql + cartodb_key;
	
	    $.getJSON(theUrl, function(data){
	        //console.log(data);
	    })
	    
	    .success(function(response) { 
	        console.log('information successfully posted to CartoDB');
	        getCurrentID();
	     
	    })
	    .error(function() { 
	        console.log('Sorry. There was an error.');
	        
	    })
	    .complete(function() {  });  
	    
	}

	
//---get + locally store current keywords	
function getCurrentKeywords(id){

	var sql_statement = "q=SELECT * FROM qnews WHERE cartodb_id='"+id+"'";
	var url_query = url_cartoData + notes_format + sql_statement;
	
	//var output = []; // to gather html here
	var keywords = [];
	//var query_count; // total returned
	
    $.getJSON(url_query, function(data){
  
	        keywords = data.features[0].properties.keywords;		
			localStorage.currentKeys = keywords;
			console.log("the current keywords are: "+keywords);

    })
    

};


//---add keyword on article click
	//$('.article a').click( function(){
	
function addKey(keyword){
	console.log('click!');
	console.log(keyword);
    	
	currentKeys = localStorage.currentKeys;
	 	
		if(currentKeys === 'null'){
    		currentKeys = keyword;
    		localStorage.currentKeys = currentKeys;
    		currentKeys = currentKeys.split();
			console.log(currentKeys);

		}else{
    		currentKeys = currentKeys.split(",");
    		currentKeys.push(keyword);

		}
		
		currentKeys = currentKeys.toString();
    	localStorage.currentKeys = currentKeys;
		    	
	//get currentID from Local Storage
	var id = localStorage.currentID;	
	
	var sqlInsert ="q=UPDATE "+ table_name +" SET keywords ='"+ currentKeys +"' WHERE cartodb_id='"+id+"'"; 
	// UPDATE qNews SET keywords = 'brooklyn' WHERE cartodb_id='21'
	
	postToDB(sqlInsert);


	};
	


	
