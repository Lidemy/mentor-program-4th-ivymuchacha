<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Week 9 hw1 - 留言板(註冊)</title>
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
    <header class="warning">
      <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
    </header>
    <main class="board">
      <h1>註冊</h1>
      <a class="board__btn" href="index.php".php">回留言板</a>
      <a class="board__btn" href="login.php">登入</a>
      <?php 
        if (!empty($_GET['errCode'])) {
          $code = $_GET['errCode'];
          $msg = 'Error';
          if ($code === '1') {
            $msg = '資料不齊全';
          };
          if ($code === '2') {
            $msg = '錯誤:帳號已被註冊';
          };
          echo '<h2>' . $msg . '</h2>';
        }
      ?>
      <form class="comment__board" method="POST" action="handle_register.php">
        <div class="comment__nickname">
          <span>暱稱：</span>
          <input type="text" name="nickname"/>
        </div>
        <div class="comment__nickname">
          <span>帳號：</span>
          <input type="text" name="username"/>
        </div>
        <div class="comment__nickname">
          <span>密碼：</span>
          <input type="password" name="password"/>
        </div>
        <input class="board__submit_btn"type="submit"/>
        </div>
      </form>
    </main>
  </body>
</html>