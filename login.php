<?php include_once('db.php')?>
<!DOCTYPE html lang="en">
<html lang="en" xml:lang="en" xmlns= "http://www.w3.org/1999/xhtml">
  <head>
      <title>King Thai Massage Health Care Centre</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="google" content="notranslate">
      <meta http-equiv="Content-Language" content="en">
      <link rel="icon" type="image/png" href="<?=$base_url?>img/favicon1.png" />
      <link rel="stylesheet" href="<?=$base_url?>css/style.css" />
  </head>
  <body>
    <header>


      <a href="/"><img src="<?=$base_url?>img/logo.png" alt="logo.png" /></a>
    </header>
    <div id="login-panel">
      <button id ="admin_user"  type="button" onclick="changeLabelText(1)" class="user-type"> Admin </button>
      <button id ="cashier_user" type="button" onclick="changeLabelText(2)" class="user-type"> Cashier </button>
      <button id ="employee_user" type="button" onclick="changeLabelText(3)" class="user-type"> Practitioner </button>
      <div id="password_ask"></div>
    </div>
  <script src="<?=$base_url?>js/login_script.js"></script>
</html>