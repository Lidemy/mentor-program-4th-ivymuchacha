<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  };

  if($username) {
    $id=$_POST['id'];

    if(empty($_POST['category_name'])) {
      header("Location: update_category.php?id=".$id."&errCode=1");
      die('資料不齊全');
    }

    $category_name=$_POST['category_name'];
    $sql = "UPDATE ivymuchacha_blogs_category SET category_name=? WHERE id=?";
    $stmt=$conn->prepare($sql);
    $stmt->bind_param("si", $category_name, $id);
    $result = $stmt->execute();
    if(!$result) {
      die('ERROR' . $conn->error);
    }
    header("Location: admin_category.php");
  } else {
    header("Location: index.php");
  }

?>