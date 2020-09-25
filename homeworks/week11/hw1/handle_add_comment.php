<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (
    empty($_POST['content'])
  ) {
    header('Location: index.php?errCode=1');
    die('資料不齊全');
  }

  $username = $_SESSION['username'];
  $content = $_POST['content'];
  $user = getUserFromUsername($username);

  if (!$username || $user['role_id'] == 3){
    header("Location: index.php");
  } else {
    $sql = "INSERT INTO ivymuchacha_w11_comments(username, content) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $username, $content);
    $result = $stmt->execute();
    if(!$result) {
      die($conn->error);
    }
    header("Location: index.php");
  }
?>