

var db = {
	
	cartodb_key: "&api_key=e344586a47e16db7281d936b31b6b1661ff3ef5d",
	table_name: 'recipes',
	url_cartoData: 'http://aesam.cartodb.com/api/v2/sql?',
	notes_limit: 100,
	notes_format: 'format=JSON&',
	
	//get recipes
	get: function(){

		var sql_statement = "q=SELECT * FROM recipes";
	    var url_query = this.url_cartoData + this.notes_format + sql_statement;
		
		
	    $.getJSON(url_query, function(data){
				    	   
			rec = data.rows;
			get.list(rec);
			
			for(i = 0; i<rec.length; i++){
				var recipename = rec[i].recipename;
				var main = rec[i].mainingreds;
				var other = rec[i].otheringreds;
				var season = rec[i].season;
				var isgf = rec[i].isgf;
				var isfish = rec[i].isfish;
				var ismeat = rec[i].ismeat;
				var isvegan = rec[i].isvegan;
				var isveg = rec[i].isveg;
				
				//get.type(isgf, isfish, ismeat, isveg, isvegan, season);			
			}

			
	    }).error(function(){
			console.log('error');
	    });
   	
   	  

	},
	
	/*post: function(sql){
		    
		    var url = this.url_cartoData + sql + this.cartodb_key;
			
		    $.getJSON(url, function(data){
		        
		    })
		    
		    .success(function(response) { 
		        //console.log('postToDB(): Information successfully posted to CartoDB');
	
		    })
		    .error(function() { 
		        //console.log('postToDB(): Sorry. There was an error posting to the DB.');
		        alert('error');
		    })
		    .complete(function() {  });  
		    
	},*/
	

}

var recipes = {
	
	gf: new Array(),
	fish: new Array(),
	meat: new Array(),
	veg: new Array(),
	vegan: new Array(),
	fall: new Array(),
	winter: new Array(),
	spring: new Array(),
	summer: new Array(),
			
};

var get = {

	type: function(isgf, isfish, ismeat, isveg, isvegan, season){

		//create type arrays
		if(isgf === 'true'){recipes.gf.push(rec[i]);}
		if(isfish === 'true'){recipes.fish.push(rec[i]);};
		if(ismeat === 'true'){recipes.meat.push(rec[i]);};
		if(isveg === 'true'){recipes.veg.push(rec[i]);};
		if(isvegan === 'true'){recipes.vegan.push(rec[i]);};
		
		//create season arrays
		season = season.split(',');				
		for(j = 0; j<season.length; j++){
			season[j] = season[j].replace(/\s/g, '');
			if(season[j] === 'Fall'){recipes.fall.push(rec[i]);};
			if(season[j] === 'Winter'){recipes.winter.push(rec[i]);};
			if(season[j] === 'Spring'){recipes.spring.push(rec[i]);}
			if(season[j] === 'Summer'){recipes.summer.push(rec[i]);}

		}
	},
	list: function(set){

		for(var i = 0; i < set.length; i++){
		
			recipename = set[i].recipename;			
			
			//get main ingreds
			var mainAll = set[i].mainingreds.replace(/\}/g, '*').replace(/\{/g, '').split('*');
			main_ingreds = this.cIngreds(mainAll);
			main_amts = this.cAmts(mainAll);
			main_prep = this.cPrep(mainAll);
			
			
			//get other ingreds
			var otherAll = set[i].othingreds.replace(/\}/g, '*').replace(/\{/g, '').split('*');
			other_ingreds = this.cIngreds(otherAll);
			other_amts = this.cAmts(otherAll);
			other_prep = this.cPrep(otherAll)
			
			//get url
			url = set[i].url;	
			
			
			var isgf = set[i].isgf;
			var isfish = set[i].isfish;
			var ismeat = set[i].ismeat;
			var isvegan = set[i].isvegan;
			var isveg = set[i].isveg;
						
			build.recipe(isgf, isfish, ismeat, isvegan, isveg); 

		}
		
	},
	cIngreds: function(array){
		var ingreds = new Array();
		var amt = new Array();

		for(j = 0; j < array.length-1; j++){
			var main = array[j].split(',');
			var name = main[1].replace("ingred: '", '').replace(/'/g, '').replace(/^\s/g, '');
			ingreds.push(name);
		}
		
		return ingreds;
	},
	cAmts: function(array){
		var howmuch = new Array();

		for(j = 0; j < array.length-1; j++){
			var main = array[j].split(',');
			var amt = main[0].replace("amt: '", '').replace(/'/g, '').replace(/^\s/g, '');
			howmuch.push(amt);
		}
				
		return howmuch;
	},
	cPrep: function(array){
		var howto = new Array();

		for(j = 0; j < array.length-1; j++){
			var main = array[j].split(',');
			if(main[2]){
				var step = main[2].replace("prep:", '').replace(/'/g, '').replace(/^\s/g, '');
			}else {
				var step = ' ';
			}
			
			howto.push(step);
		}

		return howto;
	},
	
	
};

var build = {

	clear: function(){
		$('div#recipes').empty();
	},
	list: function(){
		console.log('build list');
	},
	recipe: function(isgf, isfish, ismeat, isvegan, isveg){ 


		
		var ingreds_li = new Array();

		//create main ingredients li
		for(k = 0; k < main_ingreds.length; k++){
					
			var add = "<li class='main-ingred'>" + main_amts[k] + " " + main_ingreds[k] + " " + main_prep[k] + "</li>";
			add = add.replace(/\s\s/g, ' ');
			ingreds_li.push(add);
			
		}
		
		
		//create other ingredients li + append divs
		for(l = 0; l < other_ingreds.length; l++){
			
			var add = "<li class='other-ingred'>" + other_amts[l] + " " + other_ingreds[l] + " " + other_prep[l] + "</li>";
			add = add.replace(/\s\s/g, ' ');
			ingreds_li.push(add);
		
		}
		
			var classname = 'recipe';
			if(isgf === 'true'){classname = classname + ' gf'};
			if(isfish === 'true'){classname = classname + ' fish'};
			if(ismeat === 'true'){classname = classname + ' meat'};
			if(isvegan === 'true'){classname = classname + ' vegan'};
			if(isveg === 'true'){classname = classname + ' veg'};
			
			var thisrecipe = document.createElement("ul");
			$(thisrecipe).attr('class', classname).attr('name', recipename).append('<h1>' + recipename + '</h1>').append(ingreds_li).append('<div class="seeurl">See it <a href="'+url+'" target="_blank">here</a></div><div class="submit">send</div>');
	
			$('div#recipes').append(thisrecipe);
		
		},	
	
};



$( document ).ready(function() {
    db.get();
});