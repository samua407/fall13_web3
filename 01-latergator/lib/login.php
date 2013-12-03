<?php
include 'credentials.php';
?>


<!DOCTYPE html>
<html lang="en">
  <head>
  <title>  Lator 'Gator  </title>
  <link rel="stylesheet" href="style.css" type='text/css' />
  </head>

  <body>


      <!-- Main information here -->
      <div id="LogIn">
        <p><a href="https://foursquare.com/oauth2/authenticate?client_id=<?php echo	$client_id; ?>&response_type=code&redirect_uri=<?php echo $redirect; ?>" >&#9758;</a><br>log in to foursquare.</p>
      </div>



  </body>
</html>
 

	
