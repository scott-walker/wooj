<?php

if (isset($_GET['debug'])) {
  echo '<pre>';
  print_r($_SERVER);
}

exit;
