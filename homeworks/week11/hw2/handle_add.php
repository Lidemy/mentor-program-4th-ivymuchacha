<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  };

  if($username) {
    if(empty($_POST['title']) ||
       empty($_POST['category_id']) ||
       empty($_POST['content'])) {
        header("Location:add_article.php?errCode=1");
        die('資料不齊全');
    }

    $title=$_POST['title'];
    if(!empty($_POST['img'])) {
      $img=$_POST['img'];
    } else {
      $img ="https://i.imgur.com/37J0ckw.jpg";
    }
    $category_id=$_POST['category_id'];
    $content=$_POST['content'];

    $stmt=$conn->prepare("INSERT INTO ivymuchacha_blogs(title, img, category_id, content) VALUES (?,?,?,?)");
    $stmt->bind_param('ssis', $title, $img, $category_id, $content);
    $result=$stmt->execute();
    if(!$result) {
      die('ERROR'. $conn->error);
    } else {
      header("Location: index.php");
    }
  }

?>