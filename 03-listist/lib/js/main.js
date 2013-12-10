/* var email = ''; */

var chooser = {
	gfCheck: '',
	fishCheck: '',
	meatCheck: '',
	veganCheck: '',
	vegCheck: '',

	listen: function(){
		
		$('div.type').click(function(e){
			$('div#type').slideToggle();
		});
		
		$('img#hide_type').click(function(e){
			$('div#type').slideToggle();
		});
		
		$('div.select').click(function(e){
			chooser.type(e);		
		});

	},
	
	type: function(e){

			$(e.target).unbind('click');

			var div = $(e.target);
			div.removeClass('select').addClass('select-active');
			div.click(function(){chooser.untype(e)});
			
			$('ul.recipe').css('display', 'none');
			view.listen();
		    
		    switch(e.target){
			   case gf:
					chooser.gfCheck = 'active';
					chooser.activate();
			   break;
			    
			   case fish:
			  		chooser.fishCheck = 'active';
					chooser.activate();
			   break;
			    
			   case meat:
					chooser.meatCheck = 'active';
					chooser.activate();
			   break;
			   
			   case vegan:
					chooser.veganCheck = 'active';
					chooser.activate();
			   break;
			   
			   case veg:
					chooser.vegCheck = 'active';
					chooser.activate();
			   break;
			   
			   case all:
		   			$('div.select').addClass('select-active');
			   		chooser.gfCheck = 'active';
			   		chooser.fishCheck = 'active';
			   		chooser.meatCheck = 'active';
			   		chooser.veganCheck = 'active';
			   		chooser.vegCheck = 'active';		   		
					chooser.activate();
			   		
			   	break;
			   
		    }
	},
	
	untype: function(e){


			$(e.target).unbind('click');

			var div = $(e.target);
			div.removeClass('select-active').addClass('select');
			div.click(function(){chooser.type(e)});

			$('ul.recipe').css('display', 'none');

			switch(e.target){
			    case gf:
					chooser.gfCheck = 'inactive';
					chooser.activate();
			    break;
			    
			    case fish:
					chooser.fishCheck = 'inactive';
					chooser.activate();
			    break;
			    
			   case meat:
					chooser.meatCheck = 'inactive';
					chooser.activate();
			   break;
			   
			   case vegan:
					chooser.veganCheck = 'inactive';
					chooser.activate();
			   break;
			   
			   case veg:
					chooser.vegCheck = 'inactive';
					chooser.activate();
			   break;
			   
			   case all:
   		   			$('div.select-active').removeClass('select-active').addClass('select');
			   		chooser.gfCheck = 'inactive';
			   		chooser.fishCheck = 'inactive';
			   		chooser.meatCheck = 'inactive';
			   		chooser.veganCheck = 'inactive';
			   		chooser.vegCheck = 'inactive';	
			   		chooser.activate();
			   	break;
		    }

		//	chooser.listen();
		//});	
		
	},
	
	activate: function(){
		
		
		$('div.type p ').empty();


		if(chooser.gfCheck === 'active'){
			//console.log('gf is active');
			$('#recipes').find('ul.gf').css('display', 'block');
			$('div.type p ').append(' GF');
		}
		if(chooser.fishCheck === 'active'){
			//console.log('fish is active');
			$('#recipes').find('ul.fish').css('display', 'block');
			$('div.type p ').append(' Fish');
		}
		if(chooser.meatCheck === 'active'){
			//console.log('meat is active');
			$('#recipes').find('ul.meat').css('display', 'block');
			$('div.type p ').append(' Meat');
		}
		if(chooser.veganCheck === 'active'){
			//console.log('vegan is active');
			$('#recipes').find('ul.vegan').css('display', 'block');
			$('div.type p ').append(' Vegan');
		}
		if(chooser.vegCheck === 'active'){
			//console.log('veg is active');
			$('#recipes').find('ul.veg').css('display', 'block');
			$('div.type p ').append(' Veg.');
		}
		
		if(chooser.all === 'active'){
			$('#reciples').css('display', 'block');
		}
		
	   // chooser.listen();
	   // view.listen();
	}
	

};



var view = {
	
	listen: function(){
		$('.recipe h1').click(function(e){view.expand(e);});		
	},
	
	expand: function(e){
			$('ul.recipefull').removeClass('recipefull').addClass('recipe');
			$(e.target).unbind('click');
			shop.list = [];
			$(e.target.parentElement).removeClass('recipe').addClass('recipefull');
			$(e.target).click(function(e){view.shrink(e);});
			shop.listen();

	},
	
	shrink: function(e){
		
		$(e.target).unbind('click');
		console.log('shrink');
		$('ul.recipefull').removeClass('recipefull').addClass('recipe');
		$(e.target).click(function(e){view.expand(e);});
		$('div.submit').css('display', 'none');

	},

};


var shop = {

	list: new Array(),
	
	listen: function(){

		$('.submit').unbind('click');
		$('.submit').click(function(e){shop.send(e);})

		$('ul.recipefull li').click(function(e){
			shop.list_add(e);
		});
	},

	toggleSend: function(e){		
			var submit = e.target.parentElement;
			submit = $(submit).find('.submit')[0];
			$(submit).fadeIn();	
			
			if(shop.list.length === 0 ){
				var submit = e.target.parentElement;
				submit = $(submit).find('.submit')[0];
				$(submit).fadeOut();
			};		

	},

	list_add: function(e){
		
		$(e.target).unbind('click');
		$(e.target).addClass('shop');

		var val = $(e.target)[0].textContent;
		shop.list.push(val);
		
		shop.toggleSend(e);
		$(e.target).click(function(e){shop.list_rem(e);})
	
	},
	
	list_rem: function(e){
					
		$(e.target).unbind('click');
		$(e.target).removeClass('shop');
		
		var val = $(e.target)[0].textContent;   
		shop.list = $.grep(shop.list, function(value) {
		  return value != val;
		});
		
		shop.toggleSend(e);
		$(e.target).click(function(e){shop.list_add(e);})

		
	},
	
	check: function(){
		var atpos=email.indexOf("@");
		var dotpos=email.lastIndexOf(".");
		if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length){
			return false;
		}
	},
			
	send: function(e){
			
			console.log('send');
			
			email = prompt("Where should we email your shopping list? ", "");
			
			if(shop.check() === false){
				alert('Oops! This isn\'t a valid e-mail address. Click "send" and try again.');  
			}else{
			
		
				var info = e.target.parentElement;
				var name = $(info).find('h1')[0].innerText; //.find('name');
				var ingreds = shop.list;
				var url = $(info).find('a');
				url = $(url)[0].href;
	
	
				var num = ingreds.length;
				var ingredString = '';
	
				for(i = 0; i<num; i++){
				
					ingredString = ingredString + ingreds[i]+ '<br>' ;
				
				}
				
				var link = 'lib/mail.php?email='+email+'&ingreds='+ingredString+'&name='+name+'&url='+url;
			
			   	window.open(link,"loader");
			  	alert('sent!');
		   	};
	},
	

};
 
 
 
$(function(){chooser.listen();});