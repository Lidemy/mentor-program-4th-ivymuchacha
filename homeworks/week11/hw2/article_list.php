<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  };

  $result=getMixData();

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
        <div class="wrapper">
          <div class="blog admin">
            <?php while($row=$result->fetch_assoc()){?>
              <a class="article_link" href="article.php?id=<?php echo escape($row['id']) ?>" >
                <div class="blog__article">
                  <div>
                  <div class="blog__post__cat"><?php echo escape($row['category_name']) ?></div>
                  <div class="article__list_title"><?php echo escape($row['title']) ?></div>
                  </div>
                  <div class="article_update">
                    <div class="article__time"><?php echo escape($row['created_at']) ?></div>
                  </div>
                </div>
              </a>
            <?php }?>
          </div>
        </div>
      </section>
      <footer>
        <div>Copyright © 2020 ivymuchacha's Blog All Rights Reserved.</div>
      </footer>
    </body>
  </html>