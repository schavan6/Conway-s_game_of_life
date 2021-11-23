<?php  session_start(); ?> 
 
<?php
 

 
if(isset($_POST['login'])){   // it checks whether the user clicked login button or not 

     $user = $_POST['user'];
     $pass = $_POST['pass'];
 
    if(isset($_POST["user"]) && isset($_POST["pass"])){
    $file = fopen('accounts.txt', 'r');
    $good=false;
    while(!feof($file)){
        $line = fgets($file);
        $array = explode(";",$line);
		
    if(trim($array[0]) == $_POST['user'] && trim($array[1]) == $_POST['pass']){
	   
	        $good=true;
            break;
        }
    }
 
    if($good){
    $_SESSION['user'] = $user;
	header("Location:index.html"); 
          
    }else{
        echo "invalid UserName or Password";
    }
    fclose($file);
    }
    
 
}
?>  
	  
      
   


<!DOCTYPE html>
<html lang="en">
<head>
<meta name="Description" content="Password">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" type="text/css" href="style.css">
<title>Login</title>
</head>

<body>
<p><a href="summary.html">About</a></p>

<form method="post" action="">
<div id="Frame0">
	  <h1 align="center"> Please Enter Your Credentials to Start Playing Conway's Game of Life</h1>
       </div>
<table width="400" border="0" align="center" cellpadding="5" cellspacing="1" class="Table">

<tr><td align="right">UserID:<input type="text" name="user" class="Input"></td></tr>
<tr><td align="right">Password:<input type="password" name="pass" class="Input"></td></tr>
<tr><td align="right"><input class="Button3" name="login" type="submit" value="login"></td></tr>
<tr><td align="right"><a href="login.php">Sign Up Here</a></td></tr>
</table>

</form>

</body>
</html>


           
           		   
         	  
		

