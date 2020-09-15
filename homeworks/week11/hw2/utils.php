<?php
  require_once("conn.php");

  function escape($str) {
    $new = htmlspecialchars($str, ENT_QUOTES);
    return $new;
  }

  function getBlogData(){
    global $conn;
    $stmt=$conn->prepare("SELECT * FROM ivymuchacha_blogs WHERE is_deleted IS NULL");
    $result=$stmt->execute();
    if(!$result) {
      die('ERROR'.$conn->error);
    }
    $result=$stmt->get_result();
    return $result;
  }

  function getCatData() {
    global $conn;
    $stmt=$conn->prepare("SELECT * FROM ivymuchacha_blogs_category WHERE is_deleted IS NULL");
    $result=$stmt->execute();
    if(!$result) {
      die('ERROR'.$conn->error);
    }
    $result=$stmt->get_result();
    return $result;
  }

  function getMixData(){
    global $conn;
    $stmt=$conn->prepare("SELECT B.id AS id, B.title AS title, B.img AS img, B.content AS content, B.is_deleted AS is_deleted, B.created_at AS created_at, C.category_name AS category_name FROM ivymuchacha_blogs AS B LEFT JOIN ivymuchacha_blogs_category AS C ON B.category_id=C.id WHERE B.is_deleted IS NULL ORDER BY B.created_at DESC ");
    $result=$stmt->execute();
    if(!$result) {
      die('ERROR'.$conn->error);
    }
    $result=$stmt->get_result();
    return $result;
  }

?>