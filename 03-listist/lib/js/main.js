/* var email = ''; */

var chooser = {
	gfCheck: '',
	fishCheck: '',
	meatCheck: '',
	veganCheck: '',
	vegCheck: '',

	listen: function(){
		
		$('div.type').click(function(e){
			$('div.type').unbind('click');
			$('div#type').slideUp();
			$('div.type').removeClass('type').addClass('typeUp');
			chooser.listen();
		});
		
		$('div.typeUp').click(function(e){
			$('div.typeUp').unbind('click');
			$('div#type').slideDown();
			$('div.typeUp').removeClass('typeUp').addClass('type');
			chooser.listen();
		});
		
		$('div.select').click(function(e){
			$('div.select').unbind('click');
						
			var div = $(e.target);
			div.removeClass('select').addClass('select-active');
			
			$('ul.recipe').css('display', 'none');
		    
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
		    
		});

		$('div.select-active').click(function(e){
		
			var div = $(e.target);
			div.removeClass('select-active').addClass('select');
			
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

	
		});	
		
	},
	activate: function(){
		
		//console.log('activating!');
		
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
		
	    chooser.listen();
	    view.listen();
	}
	

};


var view = {
	
	listen: function(){

		$('ul.recipe h1').click(function(e){
			$('ul.recipe h1').unbind('click');
			$('ul.recipefull').removeClass('recipefull').addClass('recipe');
			$(e.target.parentElement).removeClass('recipe').addClass('recipefull');
			view.listen();
			view.listen_shrink();
			shop.listen();
		});
		
	},
	
	listen_shrink: function(){
		
		$('ul.recipefull h1').click(function(e){
		
			$('ul.recipefull').removeClass('recipefull').addClass('recipe');
			$('div.submit').css('display', 'none');

		});
	},
	
	toggle_open: function(){
		$('div#select-toggle').click(function(e){
		
			$('div#select-toggle').css('display', 'none');
			
		});
	}
	
	
};


var shop = {

	list: new Array(),
	
	listen: function(){
				
		$('ul.recipefull li').click(function(e){
			$('ul.recipefull li').unbind('click');
			$(e.target).addClass('shop');
			
			var submit = e.target.parentElement;//.childNodes;
			submit = $(submit).find('.submit')[0];
			$(submit).fadeIn();

			
			var val = $(e.target)[0].textContent;
			shop.list.push(val);
			
			shop.listen_cancel();
						
			shop.button(e);
			
		});
	},

	listen_cancel: function(){
		
		shop.listen();

		$('li.shop').click(function(e){
		
			$(e.target).removeClass('shop');
			
			var val = $(e.target)[0].textContent;   
			 
			shop.list = $.grep(shop.list, function(value) {
			  return value != val;

			});
			
			shop.button(e);

		});
		
	},
	
	button: function(e){
	
	
		$( 'div.submit' ).click(function(e){
			e.preventDefault();
			shop.send(e);
		});
		
		if(shop.list.length === 0 ){
			var submit = e.target.parentElement;//.childNodes;
			submit = $(submit).find('.submit')[0];
			$(submit).fadeOut();
		}
		
	},
	
	check: function(){
		var atpos=email.indexOf("@");
		var dotpos=email.lastIndexOf(".");
		if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email.length){
			return false;
		}
	},
			
	send: function(e){
			
			$(e).unbind('click');
			
				email = prompt("Where should we email your shopping list? ", "");
				if(shop.check() === false){
					alert('Oops! This isn\'t a valid e-mail address. Click "send" and try again.');  
				}

			
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
		
		   	console.log(link);
		   	window.open(link,"loader");
		   	alert('sent!');
		   	
		   	
			
		  	 
		
	},
	

};


  
$( document ).ready(function() {

	chooser.listen();	
  
  
});