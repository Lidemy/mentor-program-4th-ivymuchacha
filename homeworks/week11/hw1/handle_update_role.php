<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (
    empty($_POST['role_id'])){
    header('Location: update_role.php?errCode=1&id='.$_POST['id']);
    die('資料不齊全');
  }

  $username = $_SESSION['username'];
  $id = $_POST['id'];
  $role_id = $_POST['role_id'];

  $sql = "UPDATE ivymuchacha_w11_users SET role_id=? WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ii", $role_id, $id);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }

  header("Location: admin.php");
?>