#!/bin/sh
set -e

chown -R www-data:www-data /var/www/html
chmod -R 755 /var/www/html
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# .env
rm -f .env
cp .env.example .env

# Подставляем переменные окружения в конфигурационный файл
sed -i "s/\${HTTP_PORT}/${HTTP_PORT}/g" /tmp/nginx.env.conf
mv /tmp/nginx.env.conf /etc/nginx/http.d/default.conf

# php artisan key:generate
php artisan migrate

# Запуск nginx в фоне
nginx -g 'daemon off;' &

# Запуск php-fpm
php-fpm
