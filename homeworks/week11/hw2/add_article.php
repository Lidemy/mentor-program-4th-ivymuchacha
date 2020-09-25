<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  };

  $catResult = getCatData();

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
      <section class="main">
        <div class="wrapper main">
          <div class="blog">
            <div class="blog__board">
            <?php if($username) {?>
              <form class="update_article" method="POST" action="handle_add.php">
                <h1>發表文章：</h1>
                <?php 
                  if(!empty($_GET['errCode'])){
                    $code=$_GET['errCode'];
                    $msg ='ERROR';
                    if($code ==='1') {
                      $msg='資料不齊全';
                    };
                    echo '<span class="warning">' .$msg.'</span>';
                  }
                ?>
                <input class="update_title" type="text" name="title" placeholder="請輸入文章標題..."></input>
                <input class="update_title" type="text" name="img" placeholder="請輸入圖片網址..."></input>
                <select name="category_id" class="blog_selector">
                  <?php while($row = $catResult->fetch_assoc()) { ?>
                    <option value="<?php echo $row['id'] ?>"><?php echo $row['category_name'] ?></option>;
                  <?php } ?>
                </select>
                <div class="blog__update_content">
                  <textarea name="content" rows="15"></textarea>
                  <input class="update-btn" type="submit" value="送出文章"></input>
                </div>
              </form>
            <?php } else { ?>
              <div class="admin">
                <h2 class="warning">非管理員無法新增文章<h2>
              </div>
            <?php } ?>
            </div>
          </div>
          </div>
        </div>
      </section>
      <footer>
        <div>Copyright © 2020 ivymuchacha's Blog All Rights Reserved.</div>
      </footer>
    </body>
    <script src="https://cdn.ckeditor.com/4.7.3/standard/ckeditor.js"></script>
    <script>CKEDITOR.replace("content");</script>
  </html>