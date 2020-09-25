<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  };

  $id=$_GET['id'];

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
        <div class="banner">
          <div class="banner__info">
            <h1>吃甜甜</h1>
            <p>Welcome to my blog</p>
          </div>
        </div>
      </section>
      <section>
        <div class="wrapper">
          <div class="blog">
            <div class="article__board">
              <div class="article__title">
                <h3><?php echo escape($row['title']) ?></h3>
                <?php if($username) { ?>
                <a href="update_article.php?id=<?php echo $id ?>">編輯</a>
                <?php } ?>
              </div>
              <div class="blog__post__info">
                <img src="watch.png" /><?php echo escape($row['created_at']) ?>
              </div>
              <div class="article__pic">
                  <img src="<?php echo escape($row['img']) ?>" width="100%" class="cover" />
              </div>
              <div class="blog__post__content"><?php echo $row['content'] ?></div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div>Copyright © 2020 ivymuchacha's Blog All Rights Reserved.</div>
      </footer>
    </body>
  </html>