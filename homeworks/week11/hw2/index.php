<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  };

  $page = 1;
  if(!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $item_per_page = 5;
  $offset = ($page-1) * $item_per_page;

  $stmt=$conn->prepare(
    "SELECT B.id AS id, B.title AS title, B.img AS img, B.content AS content, B.is_deleted AS is_deleted, B.created_at AS created_at, C.category_name AS category_name FROM ivymuchacha_blogs AS B LEFT JOIN ivymuchacha_blogs_category AS C ON B.category_id=C.id WHERE B.is_deleted IS NULL ORDER BY B.created_at DESC LIMIT ? OFFSET ?");
  $stmt->bind_param('ii', $item_per_page, $offset);
  $result=$stmt->execute();
  if(!$result) {
    die('ERROR'.$conn->error);
  }
  $result=$stmt->get_result();

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
                    <a href="update_article.php?id=<?php echo escape($row['id']) ?>">編輯</a>
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
          <?php 
            $stmt = $conn->prepare(
              'SELECT COUNT(id) AS count FROM ivymuchacha_blogs WHERE is_deleted IS NULL');
            $result = $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            $count = $row['count'];
            $total_page = ceil($count/$item_per_page);
          ?>
          <div class="paginator">
            <?php if($page != 1) { ?>
              <a href="index.php?page=1">首頁</a>
              <a href="index.php?page=<?php echo $page-1 ?>">上一頁</a>
            <?php } ?>
            <?php if($page != $total_page) { ?>
              <a href="index.php?page=<?php echo $page+1 ?>">下一頁</a>
              <a href="index.php?page=<?php echo $total_page ?>">末頁</a>
            <?php } ?>
          </div>
        </div>
      </section>
      <footer>
        <div>Copyright © 2020 ivymuchacha's Blog All Rights Reserved.</div>
      </footer>
    </body>
  </html>