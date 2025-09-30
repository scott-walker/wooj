FROM php:8.4-fpm-alpine

RUN apk add --no-cache \
    build-base \
    zlib-dev \
    nginx \
    curl \
    git \
    unzip \
    libzip-dev \
    postgresql-dev \
    && docker-php-ext-install zip pdo_pgsql

# intl
RUN apk add --no-cache icu-dev \
  && docker-php-ext-configure intl \
  && docker-php-ext-install intl

# gd
RUN apk add --no-cache freetype-dev libjpeg-turbo-dev libpng-dev \
  && docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install gd

# pcntl
RUN docker-php-ext-install pcntl

# Composer
RUN curl https://getcomposer.org/installer > /tmp/composer-install.php \
    && php /tmp/composer-install.php \
    && rm -rf /tmp/composer-install.php \
    && mv composer.phar /usr/local/bin/composer

ENV COMPOSER_ALLOW_SUPERUSER=1
ENV COMPOSER_HOME=/composer
ENV PATH=$PATH:/composer/vendor/bin
RUN composer config --global process-timeout 3600

WORKDIR /var/www/html

COPY . .
COPY .docker/prod/entrypoint.sh /usr/local/bin/entrypoint.sh
COPY .docker/prod/nginx/default.conf /etc/nginx/http.d/default.conf
COPY .docker/prod/nginx/nginx.conf /etc/nginx/nginx.conf
COPY .docker/prod/php/php.ini /usr/local/etc/php/php.ini
COPY .docker/prod/php/php-fpm.conf /usr/local/etc/php-fpm.d/www.conf

RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
