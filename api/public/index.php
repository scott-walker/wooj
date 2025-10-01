<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__ . '/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__ . '/../vendor/autoload.php';

// if ($_GET['debug'] ?? false) {
//     $vars = getenv();

//     echo '<pre>';
//     print_r([
//         'APP_ENV' => $vars['APP_ENV'] ?? "",
//         'APP_DEBUG' => $vars['APP_DEBUG'] ?? "",
//         'APP_URL' => $vars['APP_URL'] ?? "",
//         'APP_FRONT_URL' => $vars['APP_FRONT_URL'] ?? "",
//         'DB_HOST' => $vars['DB_HOST'] ?? "",
//         'DB_PORT' => $vars['DB_PORT'] ?? "",
//         'DB_NAME' => $vars['DB_NAME'] ?? "",
//         'DB_USER' => $vars['DB_USER'] ?? "",
//         'DB_PASS' => $vars['DB_PASS'] ?? "",
//         'MAIL_MAILER' => $vars['MAIL_MAILER'] ?? "",
//         'MAIL_SCHEME' => $vars['MAIL_SCHEME'] ?? "",
//         'MAIL_HOST' => $vars['MAIL_HOST'] ?? "",
//         'MAIL_PORT' => $vars['MAIL_PORT'] ?? "",
//         'MAIL_USERNAME' => $vars['MAIL_USERNAME'] ?? "",
//         'MAIL_PASSWORD' => $vars['MAIL_PASSWORD'] ?? "",
//         'MAIL_FROM_ADDRESS' => $vars['MAIL_FROM_ADDRESS'] ?? "",
//     ]);
//     echo '</pre>';
//     exit;
// }

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__ . '/../bootstrap/app.php';

$app->handleRequest(request: Request::capture());
