#!/bin/sh
set -e

# chown -R www-data:www-data /var/www/html
chmod -R 755 /var/www/html
chmod -R 777 /var/www/html/storage /var/www/html/bootstrap/cache

# Запуск nginx в фоне
nginx -g 'daemon off;' &

# Запуск php-fpm
php-fpm
