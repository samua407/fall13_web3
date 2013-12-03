

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
	}
};

  
$( document ).ready(function() {

	chooser.listen();
  
  
});