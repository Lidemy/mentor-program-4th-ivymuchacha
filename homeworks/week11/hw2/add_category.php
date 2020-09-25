<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  };

  if(empty($_POST['category_name'])) {
    header("Location: admin_category.php?errCode=1");
    die('資料不齊全');
  }

  $category_name=$_POST['category_name'];

  if($username) {
    $sql = "INSERT INTO ivymuchacha_blogs_category(category_name) VALUES(?)";
    $stmt=$conn->prepare($sql);
    $stmt->bind_param("s", $category_name);
    $result = $stmt->execute();
    if(!$result) {
      die('ERROR' . $conn->error);
    }
    header("Location: admin_category.php");
  } else {
    header("Location: index.php");
  }
?>