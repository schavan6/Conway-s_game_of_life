<?php

if(isset($_POST['submit']))
 {
  $username = $_POST['name'];
  $password = $_POST['pwd'];
  $text = $username . ";" . $password . "\n";
  $fp = fopen('accounts.txt', 'a+');

    if(fwrite($fp, $text))  {
        echo 'saved';

    }
fclose ($fp);    
header("location:Password.php");
}



?>



<!DOCTYPE html>
<html lang="en">
<head>
<meta name="Description" content="Password">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet"  href="style.css">
<title>Login</title>
</head>

<body>

 <form action = "" method="POST">
      <div id="Frame0">
	  <h1 align="center"> Please enter your information to create a new login account</h1>
       </div>   
          <table width="400" border="0" align="center" cellpadding="5" cellspacing="1" class="Table">
		  <tr><td align="right"><label> Enter Name:</label><input type = "text"  name = "name" class="Input" /></td></tr>
     <tr><td align="right" ><label>Set Password:</label><input type = "password" name = "pwd" class="Input" /></td></tr>
          
        
 <tr><td align="right"><input class="Button3" type = "submit" name="submit" id = "submit" value = "submit"/></td></tr>
    <tr><td><a href="Password.php">Sign in</a></td></tr> 
	 </table>
    </form>
	
	
</form>

</body>
</html>	