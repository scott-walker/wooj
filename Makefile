include .env
export

# Переменные окружения (можно переопределить через .env файл)
API_PORT ?= 8000
FRONT_BUILD_PORT ?= 3000
FRONT_DEV_PORT ?= 5173
MAIL_INTERFACE_PORT ?= 1080
MAIL_PORT ?= 1025

DB_PORT ?= 5432
DB_USER ?= wooj
DB_PASS ?= wooj
DB_NAME ?= wooj

# Имена контейнеров
DB_CONTAINER = wooj-db
API_CONTAINER = wooj-api
FRONT_CONTAINER = wooj-front
MAIL_CONTAINER = wooj-mail

# Сеть для контейнеров
NETWORK = wooj-network


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
	@docker build -t wooj-api -f ./api/.docker/prod/Dockerfile ./api

run-api:
	@docker run -d \
		--name wooj-api \
		--network wooj-network \
		--link wooj-db:db \
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
		wooj-api

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
		--name wooj-front \
		--network wooj-network \
		-p 8080:80 \
		wooj-front

run-front-dev:
	@docker run -d \
		--name wooj-front-dev \
		--network wooj-network \
		-p 5173:5173 \
		-v $(PWD)/front:/app \
		wooj-front-dev

build-mail:
	@docker build -t wooj-mail -f ./mail/.docker/Dockerfile ./mail
















# run-api: create-network
# 	@echo "Запуск API..."
# 	@docker run -d \
# 		--name $(API_CONTAINER) \
# 		--network $(NETWORK) \
# 		-p $(API_PORT):80 \
# 		-v $(PWD)/api:/var/www \
# 		-v $(PWD)/.docker/api/php/php.ini:/usr/local/etc/php/php.ini \
# 		-v $(PWD)/.docker/api/php/docker.conf:/usr/local/etc/php-fpm.d/docker.conf \
# 		-v $(PWD)/.docker/api/nginx/default.conf:/etc/nginx/conf.d/default.conf \
# 		-v $(PWD)/.docker/api/nginx/nginx.conf:/etc/nginx/nginx.conf \
# 		-v $(PWD)/.docker/api/.bashrc:/root/.bashrc \
# 		--link $(DB_CONTAINER):db \
# 		wooj-api

# run-api-prod: create-network
# 	@echo "Запуск production API..."
# 	@docker run -d \
# 		--name $(API_CONTAINER)-prod \
# 		--network $(NETWORK) \
# 		-p $(API_PORT):80 \
# 		-e DB_HOST=$(DB_CONTAINER) \
# 		-e DB_PORT=5432 \
# 		-e DB_USER=$(DB_USER) \
# 		-e DB_PASS=$(DB_PASS) \
# 		-e DB_NAME=$(DB_NAME) \
# 		-e APP_ENV=production \
# 		-e APP_DEBUG=false \
# 		--link $(DB_CONTAINER):db \
# 		wooj-api-prod

# run-front: create-network
# 	@echo "Запуск фронтенда..."
# 	@docker run -d \
# 		--name $(FRONT_CONTAINER) \
# 		--network $(NETWORK) \
# 		-p $(FRONT_BUILD_PORT):80 \
# 		-p $(FRONT_DEV_PORT):5173 \
# 		-v $(PWD)/front:/var/www \
# 		-v $(PWD)/.docker/front/nginx/default.conf:/etc/nginx/conf.d/default.conf \
# 		-v $(PWD)/.docker/front/nginx/nginx.conf:/etc/nginx/nginx.conf \
# 		-v $(PWD)/.docker/front/.bashrc:/root/.bashrc \
# 		--link $(API_CONTAINER):api \
# 		wooj-front

# run-mail: create-network
# 	@echo "Запуск почтового сервера..."
# 	@docker run -d \
# 		--name $(MAIL_CONTAINER) \
# 		--network $(NETWORK) \
# 		-p $(MAIL_INTERFACE_PORT):80 \
# 		-p $(MAIL_PORT):25 \
# 		wooj-mail
