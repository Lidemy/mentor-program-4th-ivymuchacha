<?php 
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $page=$_POST['page'];

  $username = NULL;
  if(!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  };

  if($username) {
    $id=$_POST['id'];

    if(empty($_POST['title']) ||
       empty($_POST['category_id']) ||
       empty($_POST['content'])) {
        header("Location: update_article.php?id=".$id."&errCode=1");
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

    $sql = "UPDATE ivymuchacha_blogs SET title=?, img=?, category_id=?, content=? WHERE id=?";
    $stmt=$conn->prepare($sql);
    $stmt->bind_param("ssisi", $title, $img, $category_id, $content, $id);
    $result = $stmt->execute();
    if(!$result) {
      die('ERROR' . $conn->error);
    }
    header("Location:". $page);
  } else {
    header("Location: index.php");
  }

?>