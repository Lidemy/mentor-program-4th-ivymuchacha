<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username=$_SESSION['username'];
  }

  $stmt = $conn->prepare('SELECT * FROM ivymuchacha_comments ORDER BY id DESC');
  $result = $stmt->execute();

  if(!$result) {
    die('Error'. $conn->error);
  }
  $result = $stmt->get_result();
?>
<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Week 9 hw1 - 留言板</title>
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
    <header class="warning">
      <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
    </header>
    <main class="board">
      <h1>Comments</h1>
      <?php if(!$username) { ?>
        <a class="board__btn" href="register.php">註冊</a>
        <a class="board__btn" href="login.php">登入</a>
      <?php } else { ?>
      <h3>Hello <?php echo $username; ?></h3>
      <a class="board__btn" href="logout.php">登出</a> 
      <?php } ?>
      <?php 
        if (!empty($_GET['errCode'])) {
          $code = $_GET['errCode'];
          $msg = 'Error';
          if($code === '1') {
            $msg = '資料不齊全';
          };
          echo '<h2>' . $msg . '</h2>';
        };
      ?>
      <form class="comment__board" method="POST" action="handle_add_comment.php">
        <div class="comment__content">
          <textarea name="content" rows="5" placeholder="請輸入您的留言"></textarea>
          <?php if($username) { ?> 
          <input class="board__submit_btn"type="submit"/>
          <?php } else { ?>
            </div>
            <h2 class="warning__login">請先登入再發布留言</h2>
          <?php } ?>
        </div>
      </form>
      <div class="board__hr"></div>
      <section>
        <?php while($row = $result->fetch_assoc()) {
        ?>
        <div class="card">
          <div class="card__avatar"></div>
          <div class="card__body">
            <div class="card__info">
              <span class="card__author"><?php echo escape($row['nickname']) ?></span>
              <span class="card__time"><?php echo escape($row['created_at']) ?></span>
            </div>
            <div class="card__content"><?php echo escape($row['content']) ?></div>
          </div>
        </div>
        <?php } ?>
      </section>
    </main>
  </body>
</html>