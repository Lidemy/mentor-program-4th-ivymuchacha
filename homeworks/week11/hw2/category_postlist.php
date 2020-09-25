<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  };

  $id=$_GET['id'];

  $stmt=$conn->prepare(
    "SELECT B.id AS id, B.title AS title, B.img AS img, B.content AS content, B.is_deleted AS is_deleted, B.created_at AS created_at, C.id AS category_id, C.category_name AS category_name FROM ivymuchacha_blogs AS B LEFT JOIN ivymuchacha_blogs_category AS C ON B.category_id=C.id WHERE B.is_deleted IS NULL AND C.id =? ORDER BY B.created_at DESC");
  $stmt->bind_param('i', $id);
  $result=$stmt->execute();
  if(!$result) {
    die('ERROR'.$conn->error);
  }
  $result=$stmt->get_result();

  $stmt=$conn->prepare(
    "SELECT * FROM ivymuchacha_blogs_category WHERE id=?");
  $stmt->bind_param('i', $id);
  $catResult=$stmt->execute();
  if(!$result) {
    die('ERROR'.$conn->error);
  }
  $catResult=$stmt->get_result();

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
          <?php $catRow=$catResult->fetch_assoc(); ?>
            <h1><?php echo escape($catRow['category_name']) ?></h1>
            <p>Welcome to my blog</p>
          </div>
        </div>
      </section>
      <section>
        <div class="wrapper main">
          <div class="blog">
            <?php while($row=$result->fetch_assoc()) { ?>
            <div class="blog__board">
              <div class="blog__post">
                <div class="blog__post__pic">
                  <img src="<?php echo escape($row['img']) ?>" width="100%" class="cover" />
                </div>
                <div class="blog__post__wording">
                  <div class="blog__post__cat"><?php echo $row['category_name'] ?></div>
                  <div class="blog__post__title">
                    <h3><?php echo escape($row['title']) ?></h3>
                    <?php if($username) {?>
                    <a href="update_article.php?id=<?php echo $row['id'] ?>">編輯</a>
                    <?php }?>
                  </div>
                  <div class="blog__post__info">
                    <img src="watch.png" /><?php echo escape($row['created_at']) ?>
                  </div>
                  <div class="blog__post__content limit"><?php echo $row['content'] ?></div>
                  <a class="post__btn" href="article.php?id=<?php echo escape($row['id']) ?>">READ MORE</a>
                </div>
              </div>
            </div>
            <?php } ?>
          </div>
        </div>
      </section>
      <footer>
        <div>Copyright © 2020 ivymuchacha's Blog All Rights Reserved.</div>
      </footer>
    </body>
  </html>