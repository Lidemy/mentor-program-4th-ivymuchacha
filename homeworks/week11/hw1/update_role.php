<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $id = $_GET['id'];
  $username = NULL;
  $user = NULL;
  if(!empty($_SESSION['username'])) {
    $username=$_SESSION['username'];
    $user = getUserFromUsername($username);
  }

  $stmt = $conn->prepare('SELECT * FROM ivymuchacha_w11_users WHERE id=?');
  $stmt->bind_param("i",$id);
  $result = $stmt->execute();

  if(!$result) {
    die('Error'. $conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  $stmt = $conn->prepare('SELECT * FROM ivymuchacha_w11_roles ORDER BY id ASC');
  $role_result = $stmt->execute();

  if(!$result) {
    die('Error'. $conn->error);
  }
  $role_result = $stmt->get_result();
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
      <h1>編輯權限</h1>
      <form class="comment__board" method="POST" action="handle_update_role.php">
        <a class="board__btn" href="admin.php">回管理後台</a>
        <section>
          <table>
            <tr>
              <th>#</th>
              <th>帳號</th>
              <th>暱稱</th>
              <th>加入時間</th>
              <th>編輯權限</th>
              <th>送出</th>
            </tr>
              <tr>
                <td><?php echo escape($row['id']) ?></td>
                <td><?php echo escape($row['username']) ?></td>
                <td><?php echo escape($row['nickname']) ?></td>
                <td><?php echo escape($row['created_at']) ?></td>
                <td><select name="role_id">
                  <?php 
                    while($row_role = $role_result->fetch_assoc()) { 
                      $id = $row_role['id'];
                      $role_name = $row_role['role_name'];
                      $is_checked = $row['role_id'] === $id ? "selected":"";
                      echo "<option value='$id' $is_checked>$role_name</option>";
                    }
                  ?>
                </select></td>
                <td><input type="hidden" name="id" value="<?php echo $row['id'] ?>"/>
                    <input class="edit-btn" type="submit"/></td>
              </tr>
          </table>
        </section>
      </form>
      <div class="board__hr"></div>
    </main>
  </body>
</html>