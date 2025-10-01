#!/bin/sh
set -e

cp -f /app/.env.example /app/.env

# Запуск php-fpm
# php-fpm
php -S 0.0.0.0:10000 -t /app /app/env.php
