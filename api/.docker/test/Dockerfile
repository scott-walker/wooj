FROM php:8.4-fpm-alpine

WORKDIR /test

COPY ./tests/other .
COPY ./.env .
COPY .docker/test/entrypoint.sh /usr/local/bin/entrypoint.sh
# COPY .docker/test/php/php-fpm.conf /usr/local/etc/php-fpm.d/www.conf

RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 10000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
