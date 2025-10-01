#!/bin/sh
set -e

# Установка переменных по умолчанию
HTTP_PORT=10000 #${HTTP_PORT:-80}

# Установка прав доступа
chown -R www-data:www-data /var/www/html
chmod -R 755 /var/www/html
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# .env
cp -f .env.example .env

# Подставляем переменные окружения в конфигурационный файл
sed -i "s/\$HTTP_PORT/$HTTP_PORT/g" /etc/nginx/http.d/default.conf

php artisan key:generate --force
php artisan migrate --force

# Запуск nginx в фоне
nginx -g 'daemon off;' &

# Запуск php-fpm
php-fpm
