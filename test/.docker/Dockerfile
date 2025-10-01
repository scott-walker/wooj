FROM php:8.4-fpm-alpine

# Устанавливаем композер
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Копируем файлы проекта
COPY ./src /app
WORKDIR /app

# Устанавливаем зависимости
RUN composer require vlucas/phpdotenv

# Копируем entrypoint скрипт и даем права на выполнение
COPY ./.docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 10000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
