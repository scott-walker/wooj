#!/bin/sh
set -e

# Запуск php-fpm
# php-fpm
php -S 0.0.0.0:10000 -t /app /app/env.php
