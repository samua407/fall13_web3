var email = 'samuel.ae@gmail.com';

var chooser = {
	gfCheck: '',
	fishCheck: '',
	meatCheck: '',
	veganCheck: '',
	vegCheck: '',

	listen: function(){
		
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
			   
		    }

	
		});	
		
	},
	activate: function(){
		
		//console.log('activating!');
		
		if(chooser.gfCheck === 'active'){
			//console.log('gf is active');
			var test = $('#recipes').find('ul.gf').css('display', 'block');
		}
		if(chooser.fishCheck === 'active'){
			//console.log('fish is active');
			$('#recipes').find('ul.fish').css('display', 'block');
		}
		if(chooser.meatCheck === 'active'){
			//console.log('meat is active');
			$('#recipes').find('ul.meat').css('display', 'block');
		}
		if(chooser.veganCheck === 'active'){
			//console.log('vegan is active');
			$('#recipes').find('ul.vegan').css('display', 'block');
		}
		if(chooser.vegCheck === 'active'){
			//console.log('veg is active');
			$('#recipes').find('ul.veg').css('display', 'block');
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
		if(shop.list.length === 0 ){
			var submit = e.target.parentElement;//.childNodes;
			submit = $(submit).find('.submit')[0];
			$(submit).fadeOut();
		}
		
	},
	
	send: function(){
	
		
	},
	

};


  
$( document ).ready(function() {

	chooser.listen();	
  
  
});