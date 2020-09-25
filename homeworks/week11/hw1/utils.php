<?php
  require_once("conn.php");

  function getUserFromUsername($username) {
    global $conn;
      $sql = sprintf(
        "SELECT * FROM ivymuchacha_w11_users WHERE username = '%s'",
        $username
      );
      $result = $conn->query($sql);
      $row = $result->fetch_assoc();
      return $row;
  }

  function generateToken() {
    $s = '';
    for($i = 1; $i <= 16; $i++) {
      $s .= chr(rand(65, 90));
    };
    return $s;
  }

  function escape($str) {
    $new = htmlspecialchars($str, ENT_QUOTES);
    return $new;
  }
?>