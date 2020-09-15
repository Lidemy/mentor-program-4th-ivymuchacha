<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  };
?>
<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>部落格 - Week11 HW2 </title>
      <link rel="stylesheet" href="style.css">
    </head>

    <body>
      <?php include_once('navbar.php')?>
      <section>
        <div class="banner">
          <div class="banner__info">
            <h1>吃甜甜</h1>
            <p>Welcome to my blog</p>
          </div>
        </div>
      </section>
      <section>
        <div class="wrapper main">
          <?php if(!$username) { ?>
            <div class="login__board">
              <h1>Log In</h1>
              <?php 
                if(!empty($_GET['errCode'])){
                  $code=$_GET['errCode'];
                  $msg ='ERROR';
                  if($code ==='1') {
                    $msg='資料不齊全';
                  };
                  if($code ==='2') {
                    $msg='帳號或密碼錯誤';
                  };
                  echo '<h2 class="warning">' .$msg.'</h2>';
                }
              ?>
              <form method="POST" action="handle_login.php">
                <div>USERNAME</div>
                <input class="login_input" name="username" type="text"></input>
                <div>PASSWORD</div>
                <input class="login_input" name="password" type="password"></input>
                <input class="submit__btn" type="submit" value="SIGN IN">
              </form>
            </div>
          <?php } else {header("Location: index.php");}?>
        </div>
      </section>
      <footer>
        <div>Copyright © 2020 ivymuchacha's blog All Rights Reserved.</div>
      </footer>
    </body>
  </html>