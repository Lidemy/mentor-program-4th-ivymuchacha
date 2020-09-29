<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  $user = NULL;
  if(!empty($_SESSION['username'])) {
    $username=$_SESSION['username'];
    $user = getUserFromUsername($username);
  };

  $page = 1;
  if(!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $item_per_page = 5;
  $offset = ($page-1) * $item_per_page;

  $stmt = $conn->prepare(
    'SELECT C.id AS id, C.content AS content, C.created_at AS created_at, U.nickname AS nickname, U.username AS username '.
    'FROM ivymuchacha_w11_comments AS C '.
    'LEFT JOIN ivymuchacha_w11_users AS U '.
    'ON C.username = U.username '.
    'WHERE C.is_deleted IS NULL ORDER BY C.id DESC '.
    'LIMIT ? OFFSET ?');
  $stmt->bind_param('ii', $item_per_page, $offset);
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
    <title>Week 11 hw1 - 留言板</title>
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
      <div class="sayhi">
        <h3>Hello <?php echo escape($user['nickname']) ?></h3>
      </div>
      <form class="hide board_nickname_form comment__board" method="POST" action="update_user.php">
        <div class="comment__nickname">
          <span>新的暱稱：</span>
          <input class="nickname_btn" type="text" name="nickname" />
          <input class="board__submit_btn" type="submit"/>
        </div> 
      </form>
      <a class="board__btn" href="logout.php">登出</a> 
      <span class="update_nickname">編輯暱稱</span>
      <?php } ?>
      <?php if($username && $user['role_id'] == 1) { ?>
        <a class="board__btn" href="admin.php">後台管理 </a>
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
          <?php if($username && $user['role_id']!=3) { ?> 
          <input class="board__submit_btn"type="submit"/>
          <?php } else if($username && $user['role_id']==3){ ?>
            </div>
            <h2 class="warning__login">遭停權無法發布留言</h2>
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
              <span class="card__author"><?php echo '(@' . escape($row['username']).')' ?></span>
              <span class="card__time"><?php echo escape($row['created_at']) ?></span>
              <?php if($row['username']=== $username) {?>
              <a href="update_comment.php?id=<?php echo ($row['id'])?>">編輯</a>
              <?php } ?>
              <?php if($row['username']=== $username || $username && $user['role_id']== 1) { ?>
              <a href="delete_comment.php?id=<?php echo ($row['id'])?>">刪除</a>
              <?php } ?>
            </div>
            <div class="card__content"><?php echo escape($row['content']) ?></div>
          </div>
        </div>
        <?php } ?>
      </section>
        <div class="board__hr"></div>
        <?php 
          $stmt = $conn->prepare(
            'SELECT COUNT(id) AS count FROM ivymuchacha_w11_comments WHERE is_deleted IS NULL');
          $result = $stmt->execute();
          $result = $stmt->get_result();
          $row = $result->fetch_assoc();
          $count = $row['count'];
          $total_page = ceil($count/$item_per_page);
        ?>
      <div class="page_info">
        <span>總共有 <?php echo $count ?> 筆留言，</span>
        <span>頁數： <?php echo $page ?>/<?php echo $total_page ?> 頁</span>
      </div>
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
    </main>
    <script>
      document.querySelector('.update_nickname').addEventListener('click', ()=> {
        document.querySelector('.board_nickname_form').classList.toggle('hide');
      });
    </script>
  </body>
</html>