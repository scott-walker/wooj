<?php

require_once 'vendor/autoload.php';

use Dotenv\Dotenv;

if (isset($_GET['debug'])) {
  $dotenv = Dotenv::createImmutable(__DIR__);
  $dotenv->load();

  echo '<pre>';
  print_r($_ENV);
}

exit;
