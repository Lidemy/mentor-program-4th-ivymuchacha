<nav class="navbar">
  <div class="wrapper">
    <div class="navbar__list">
      <h1><a href="index.php">ivymuchacha's blog</a></h1>
      <ul class="navbar__article">
        <li><a href="article_list.php">文章列表</a></li>
        <li><a href="category.php">分類專區</a></li>
        <li><a href="aboutme.php">關於我</a></li>
      </ul>
    </div>
    <ul class="navbar__admin">
      <?php if(!$username) {?>
        <li><a href="login.php">登入</a></li>
      <?php } else { ?>
        <li><a href="admin.php">管理後台</a></li>
        <li><a href="logout.php">登出</a></li>
      <?php } ?>
    </ul>
  </div>
</nav>