<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  $user = NULL;
  if(!empty($_SESSION['username'])) {
    $username=$_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  $page = 1;
  if(!empty($_GET['page'])) {
    $page = intval($_GET['page']);
  }
  $user_per_page = 10;
  $offset = ($page-1) * $user_per_page;

  //帳戶資料
  $stmt = $conn->prepare(
    'SELECT U.id AS id, U.username AS username, U.nickname AS nickname, U.created_at AS created_at, U.role_id AS role_id, R.role_name AS role_name '.
    'FROM ivymuchacha_w11_users AS U '.
    'LEFT JOIN ivymuchacha_w11_roles AS R '.
    'ON U.role_id = R.id '.
    'ORDER BY U.id DESC '.
    'LIMIT ? OFFSET ?');
  $stmt->bind_param('ii', $user_per_page, $offset);
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
    <main class="admin board">
      <h1>管理後台</h1>
      <a class="board__btn" href="index.php">回留言板</a>
      <?php if($username && $user['role_id']==1) { ?>    
      <section>
        <table>
          <tr>
            <th>#</th>
            <th>帳號</th>
            <th>暱稱</th>
            <th>加入時間</th>
            <th>權限</th>
            <th>編輯權限</th>
          </tr>
          <?php while($row = $result->fetch_assoc()) { ?>
            <tr>
              <td><?php echo escape($row['id']) ?></td>
              <td><?php echo escape($row['username']) ?></td>
              <td><?php echo escape($row['nickname']) ?></td>
              <td><?php echo escape($row['created_at']) ?></td>
              <td><?php echo escape($row['role_name']) ?></td>
              <td><a class="edit-btn" href="update_role.php?id=<?php echo ($row['id'])?>">編輯</a></td>
            </tr>
          <?php } ?>
        </table>
      </section>
      
        <div class="board__hr"></div>
        <?php 
          $stmt = $conn->prepare(
            'SELECT COUNT(id) AS count FROM ivymuchacha_w11_users');
          $result = $stmt->execute();
          $result = $stmt->get_result();
          $row = $result->fetch_assoc();
          $count = $row['count'];
          $total_page = ceil($count/$user_per_page);
        ?>
      <div class="page_info">
        <span>總共有 <?php echo $count ?> 筆資料，</span>
        <span>頁數： <?php echo $page ?>/<?php echo $total_page ?> 頁</span>
      </div>
      <div class="paginator">
        <?php if($page != 1) { ?>
        <a href="admin.php?page=1">首頁</a>
        <a href="admin.php?page=<?php echo $page-1 ?>">上一頁</a>
        <?php } ?>
        <?php if($page != $total_page) { ?>
        <a href="admin.php?page=<?php echo $page+1 ?>">下一頁</a>
        <a href="admin.php?page=<?php echo $total_page ?>">末頁</a>
        <?php } ?>
      </div>
      <?php } else { ?>
        <h2>非管理員無權限使用</h2>
      <?php } ?>
    </main>
  </body>
</html>