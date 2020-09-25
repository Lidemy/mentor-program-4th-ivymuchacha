<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  };

  if($username) {
    $id=$_GET['id'];
    $sql = "UPDATE ivymuchacha_blogs_category SET is_deleted=1 WHERE id=?";
    $stmt=$conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $result = $stmt->execute();
    if(!$result) {
      die('ERROR' . $conn->error);
    }
    header("Location: admin_category.php");
  } else {
    header("Location: index.php");
  }
?>