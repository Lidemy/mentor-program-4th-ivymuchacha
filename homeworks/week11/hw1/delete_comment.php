<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (
    empty($_GET['id'])){
    header('Location: index.php?errCode=1');
    die('資料不齊全');
  }

  $id = $_GET['id'];
  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
  $role_id = $user['role_id'];

  $sql = "UPDATE ivymuchacha_w11_comments SET is_deleted=1 WHERE id=? AND username=?";
  if ($role_id == 1) {
    $sql = "UPDATE ivymuchacha_w11_comments SET is_deleted=1 WHERE id=?";
  }
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("is", $id, $username);
  if ($role_id == 1) {
    $stmt->bind_param("i", $id);
  }
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>