include .env
export

# Порты
API_PORT ?= 8000
FRONT_PORT ?= 5173
MAIL_INTERFACE_PORT ?= 1080
MAIL_PORT ?= 1025

# Переменные к БД
DB_PORT ?= 5432
DB_USER ?= wooj
DB_PASS ?= wooj
DB_NAME ?= wooj

# Имена контейнеров
DB_CONTAINER = wooj-db
API_CONTAINER = wooj-api
FRONT_CONTAINER = wooj-front
MAIL_CONTAINER = wooj-mail

# Имена образов
DB_IMAGE = wooj-db
API_IMAGE = wooj-api
FRONT_IMAGE = wooj-front
MAIL_IMAGE = wooj-mail

# Сеть для контейнеров
NETWORK = wooj-network


# Docker compose

up:
	@docker compose up -d

down:
	@docker compose down

restart:
	@docker compose down
	@docker compose up -d

# NETWORK

create-network:
	@docker network create $(NETWORK) 2>/dev/null || true

# DB

build-db:
	@docker build -t wooj-db -f ./db/.docker/Dockerfile ./db

run-db: 
	@docker run -d \
		--name $(DB_CONTAINER) \
		--network $(NETWORK) \
		-p $(DB_PORT):5432 \
		-v $(PWD)/db/data:/var/lib/postgresql/data \
		-e POSTGRES_USER=$(DB_USER) \
		-e POSTGRES_PASSWORD=$(DB_PASS) \
		-e POSTGRES_DB=$(DB_NAME) \
		wooj-db

# API

build-api:
	@docker build -D --no-cache \
		-f ./api/.docker/prod/Dockerfile \
		-t wooj-api \
		./api
	
build-api-dev:
	@docker build -D --no-cache \
		-f ./api/.docker/dev/Dockerfile \
		-t wooj-api-dev \
		./api

run-api:
	@docker run -d \
		--name $(API_CONTAINER) \
		--network $(NETWORK) \
		-p $(API_PORT):$(API_PORT) \
		-e HTTP_PORT=$(API_PORT) \
		-e DB_HOST=$(DB_CONTAINER) \
		-e DB_PORT=5432 \
		-e DB_USER=$(DB_USER) \
		-e DB_PASS=$(DB_PASS) \
		-e DB_NAME=$(DB_NAME) \
		-e APP_URL=$(APP_URL) \
		-e APP_FRONT_URL=$(APP_FRONT_URL) \
		-e APP_ENV=production \
		-e APP_DEBUG=false \
		-v ${PWD}/api/.docker/prod/entrypoint.sh:/usr/local/bin/entrypoint.sh \
		wooj-api

run-api-dev:
	@docker run -d \
		--name $(API_CONTAINER)-dev \
		--network $(NETWORK) \
		-p $(API_PORT):80 \
		-e DB_HOST=$(DB_CONTAINER) \
		-e DB_PORT=5432 \
		-e DB_USER=$(DB_USER) \
		-e DB_PASS=$(DB_PASS) \
		-e DB_NAME=$(DB_NAME) \
		-e APP_URL=$(APP_URL) \
		-e APP_FRONT_URL=$(APP_FRONT_URL) \
		-e APP_ENV=local \
		-e APP_DEBUG=true \
		-e MAIL_MAILER=smtp \
		-e MAIL_SCHEME=http \
		-e MAIL_HOST=mail \
		-e MAIL_PORT=$(MAIL_PORT) \
		-e MAIL_USERNAME=null \
		-e MAIL_PASSWORD=null \
		-e MAIL_FROM_ADDRESS=hello@wooj \
		-v $(PWD)/api:/var/www/html \
		-v ${PWD}/api/.docker/dev/entrypoint.sh:/usr/local/bin/entrypoint.sh \
		-v ${PWD}/api/.docker/dev/nginx/nginx.conf:/etc/nginx/nginx.conf \
		-v ${PWD}/api/.docker/dev/nginx/default.conf:/etc/nginx/http.d/default.conf \
		-v ${PWD}/api/.docker/dev/php/php.ini:/usr/local/etc/php/php.ini \
		-v ${PWD}/api/.docker/dev/php/php-fpm.conf:/usr/local/etc/php-fpm.d/www.conf \
		wooj-api-dev

# FRONT

build-front:	
	@docker build -D --no-cache \
		-f ./front/.docker/prod/Dockerfile \
		-t wooj-front \
		./front

build-front-dev:	
	@docker build -D --no-cache \
		-f ./front/.docker/dev/Dockerfile \
		-t wooj-front-dev \
		./front

run-front:
	@docker run -d \
		--name $(FRONT_CONTAINER) \
		--network $(NETWORK) \
		-p $(FRONT_PORT):80 \
		wooj-front

run-front-dev:
	@docker run -d \
		--name $(FRONT_CONTAINER)-dev \
		--network $(NETWORK) \
		-p $(FRONT_PORT):5173 \
		-v $(PWD)/front:/app \
		wooj-front-dev

# MAIL

build-mail:
	@docker build -D --no-cache \
		-f ./mail/.docker/Dockerfile \
		-t wooj-mail \
		./mail

run-mail:
	@docker run -d \
		--name $(MAIL_CONTAINER) \
		--network $(NETWORK) \
		-p $(MAIL_INTERFACE_PORT):80 \
		-p $(MAIL_PORT):25 \
		wooj-mail
