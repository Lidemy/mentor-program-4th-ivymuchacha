<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  };

  $stmt=$conn->prepare("SELECT * FROM ivymuchacha_blogs WHERE id=?");
  $stmt->bind_param('i', $id);
  $result=$stmt->execute();
  if(!$result) {
    die('ERROR'.$conn->error);
  }
  $result=$stmt->get_result();
  $row=$result->fetch_assoc();
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
        <div class="banner me">
          <div class="banner__info">
            <h1>關於 ivymuchacha</h1>
            <p>Who is ivymuchacha?</p>
          </div>
        </div>
      </section>
      <section>
        <div class="wrapper main">
          <div class="blog">
            <div class="article__board aboutme">
              <div class="article__title">
                <h3>Who is ivymuchacha?</h3>
              </div>
              <div class="blog__post__content">熱愛做甜點 也喜歡到處吃甜食的螞蟻人！<br><br>14 歲時與一台復古攪拌器的邂逅， 20歲時和紐約小女孩在公車上的相遇。<br><br>開始了ivymuchacha 的嗜甜之旅。
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div>Copyright © 2020 ivymuchacha's Blog All Rights Reserved.</div>
      </footer>
    </body>
  </html>