<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  };

  $result = getMixData();

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
            <h1>吃甜甜 - 管理後台</h1>
            <p>Welcome to my blog</p>
          </div>
        </div>
      </section>
      <section>
        <div class="wrapper main">
          <div class="blog admin">
            <?php if($username) { ?>
              <div class="admin__bar">
                <a class="admin__bar_btn" href="admin_category.php">管理分類</a>
                <a class="admin__bar_btn" href="add_article.php" ?>新增文章</a>
              </div>
              <?php while($row=$result->fetch_assoc()){?>
                <a class="article_link" href="article.php?id=<?php echo escape($row['id']) ?>">
                <div class="blog__article">
                  <div>
                    <div class="blog__post__cat"><?php echo escape($row['category_name']) ?></div>
                    <div class="article__list_title"><?php echo escape($row['title']) ?></div>
                  </div>
                  <div class="article_update">
                      <div class="article__time"><?php echo escape($row['created_at']) ?></div>
                      <a class="admin__btn" href="update_article.php?id=<?php echo $row['id'] ?>">編輯</a>
                      <a class="admin__btn" href="delete_article.php?id=<?php echo $row['id'] ?>">刪除</a>
                    </div>
                  </div>
                </a>
              <?php }?>
            <?php } else { ?>
              <h2 class="warning">非管理員無權限使用<h1>
            <?php } ?>
          </div>
        </div>
      </section>
      <footer>
        <div>Copyright © 2020 ivymuchacha's Blog All Rights Reserved.</div>
      </footer>
    </body>
  </html>