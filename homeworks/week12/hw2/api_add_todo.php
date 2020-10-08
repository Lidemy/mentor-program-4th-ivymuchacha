<?php 
  require_once('conn.php');
  header('Content-type:application/json;charset=utf-8');
  header('Access-Control-Allow-Origin:*');

  if (empty($_POST['todo'])
  ) {
      $json = array(
        "ok"=>false,
        "message"=>"Please insert the empty fields"
      );

      $response = json_encode($json);
      echo $response;
      die();
  }

  $todo = $_POST['todo'];

  $sql = "INSERT INTO ivymuchacha_w12_todos(todo) VALUES(?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $todo);
  $result=$stmt->execute();
  
  if(!$result) {
    $json = array(
      "ok"=>false,
      "message"=>$conn->error
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $json = array(
    "ok" => true,
    "message" =>"sucess",
    "id" => $conn->insert_id
  );
  $response = json_encode($json);
  echo $response;
?>