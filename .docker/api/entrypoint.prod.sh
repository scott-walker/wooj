#!/bin/sh
set -e

# Установка прав доступа
chmod -R 755 /var/www
chmod -R 775 /var/www/storage /var/www/bootstrap/cache

cp /var/www/.env.example /var/www/.env

# Генерация ключа приложения
php artisan key:generate --force

# Кэширование конфигурации для production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Запуск миграций
php artisan migrate --force

# Очистка кэша
php artisan cache:clear

# Запуск сервисов
nginx -g 'daemon off;' &
php-fpm
