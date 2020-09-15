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
      <section>
        <div class="wrapper main">
          <div class="blog">
            <div class="blog__board">
              <?php if($username) {?>
                <form class="update_article" method="POST" action="handle_update_article.php?id=<?php echo $id ?>">
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
                  <input class="update_title" type="text" name="title" value="<?php echo escape($row['title'])?>"></input>
                  <input class="update_title" type="text" name="img" value="<?php echo escape($row['img'])?>"></input>
                  <select name="category_id" class="blog_selector">
                    <?php 
                        while($row_category = $catResult->fetch_assoc()) { 
                          $id = $row_category['id'];
                          $category_name = $row_category['category_name'];
                          $is_checked = $row['category_id'] === $id ? "selected":"";
                          echo "<option value='$id' $is_checked >$category_name</option>";
                        }
                      ?>
                  </select>
                  <div class="blog__update_content">
                    <textarea name="content" rows="15">
                      <?php echo escape($row['content']) ?>
                    </textarea>
                    <input type="hidden" name="id" value="<?php echo $row['id'] ?>"/>
                    <input type="hidden" name="page" value="<?php echo $_SERVER['HTTP_REFERER']?>"/>
                    <input class="update-btn" type="submit" value="送出文章"></input>
                  </div>
                </form>
              <?php } else {?>
                <div class="admin">
                  <h2 class="warning">非管理員無法編輯文章<h1>
                </div>
              <?php } ?>
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