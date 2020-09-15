<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  };
  $id=$_GET['id'];

  $sql="SELECT * FROM ivymuchacha_blogs_category WHERE id=?";
  $stmt=$conn->prepare($sql);
  $stmt->bind_param('i',$id);
  $result=$stmt->execute();
  if(!$result) {
    die('ERROR'.$conn->error);
  }
  $result=$stmt->get_result();
  $id_row=$result->fetch_assoc();

  $result= getCatData();
  

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
            <h1>吃甜甜 - 管理分類</h1>
            <p>Welcome to my blog</p>
          </div>
        </div>
      </section>
      <section>
        <div class="wrapper main">
          <div class="blog admin ">
            <?php 
              if(!empty($_GET['errCode'])){
                $code =$_GET['errCode'];
                $msg="ERROR";
                if($code === '1'){
                  $msg='資料不齊全';
                };
                echo '<h2 class="warning">' .$msg.'</h2>';
              }
            ?>
            <?php if(!$username) { ?>
              <h2 class="warning">非管理員無權限使用<h1>
            <?php } else {?>
              <form class="category_admin" method="POST" action="handle_update_category.php">
                <input type="text" class="category_add_name" name="category_name" value="<?php echo escape($id_row['category_name']) ?>" />
                <input type="submit" class="category_add_btn" value="送出"/>
                <input type="hidden" name="id" value="<?php echo $id_row['id'] ?>"/>
              </form>
              <?php while($row=$result->fetch_assoc()){?>
                <div class="blog__article">
                  <div class="article__title"><?php echo escape($row['category_name']) ?></div>
                  <div class="article_update">
                    <a class="admin__btn" href="update_category.php?id=<?php echo escape($row['id']) ?>">編輯</a>
                    <a class="admin__btn" href="delete_category.php?id=<?php echo escape($row['id']) ?>">刪除</a>
                  </div>
                </div>
              <?php }?>
            <?php }?>
          </div>
        </div>
      </section>
      <footer>
        <div>Copyright © 2020 ivymuchacha's Blog All Rights Reserved.</div>
      </footer>
    </body>
  </html>