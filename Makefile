# Wooj.ru Makefile
# Команды для запуска контейнеров по отдельности

# Переменные окружения (можно переопределить через .env файл)
DB_PORT ?= 5432
API_PORT ?= 8000
FRONT_BUILD_PORT ?= 3000
FRONT_DEV_PORT ?= 5173
MAIL_INTERFACE_PORT ?= 1080
MAIL_PORT ?= 1025

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

.PHONY: help build-db build-api build-front build-mail build-all
.PHONY: run-db run-api run-front run-mail run-all
.PHONY: stop-db stop-api stop-front stop-mail stop-all
.PHONY: logs-db logs-api logs-front logs-mail
.PHONY: shell-db shell-api shell-front shell-mail
.PHONY: clean-db clean-api clean-front clean-mail clean-all
.PHONY: restart-db restart-api restart-front restart-mail restart-all

# Помощь
help:
	@echo "Доступные команды:"
	@echo "  build-*     - Собрать образ контейнера"
	@echo "  run-*       - Запустить контейнер"
	@echo "  stop-*      - Остановить контейнер"
	@echo "  logs-*      - Показать логи контейнера"
	@echo "  shell-*     - Войти в контейнер"
	@echo "  clean-*     - Удалить контейнер и образ"
	@echo "  restart-*   - Перезапустить контейнер"
	@echo ""
	@echo "Примеры:"
	@echo "  make run-db     - Запустить базу данных"
	@echo "  make run-api    - Запустить API"
	@echo "  make run-front  - Запустить фронтенд"
	@echo "  make run-all    - Запустить все контейнеры"

# Создание сети
create-network:
	@docker network create $(NETWORK) 2>/dev/null || true

# Сборка образов
build-db:
	@echo "Сборка образа базы данных..."
	@docker build -t wooj-db .docker/db

build-api:
	@echo "Сборка образа API..."
	@docker build -t wooj-api .docker/api

build-api-prod:
	@echo "Сборка production образа API..."
	@docker build -f .docker/api/Dockerfile.prod -t wooj-api-prod ./

build-front:
	@echo "Сборка образа фронтенда..."
	@docker build -t wooj-front .docker/front

build-mail:
	@echo "Сборка образа почтового сервера..."
	@docker build -t wooj-mail .docker/mail

build-all: build-db build-api build-front build-mail
build-all-prod: build-db build-api-prod build-front build-mail

# Запуск контейнеров
run-db: create-network
	@echo "Запуск базы данных..."
	@docker run -d \
		--name $(DB_CONTAINER) \
		--network $(NETWORK) \
		-p $(DB_PORT):5432 \
		-v $(PWD)/.docker/db/data:/var/lib/postgresql/data \
		-e POSTGRES_USER=$(DB_USER) \
		-e POSTGRES_PASSWORD=$(DB_PASS) \
		-e POSTGRES_DB=$(DB_NAME) \
		wooj-db

run-api: create-network
	@echo "Запуск API..."
	@docker run -d \
		--name $(API_CONTAINER) \
		--network $(NETWORK) \
		-p $(API_PORT):80 \
		-v $(PWD)/api:/var/www \
		-v $(PWD)/.docker/api/php/php.ini:/usr/local/etc/php/php.ini \
		-v $(PWD)/.docker/api/php/docker.conf:/usr/local/etc/php-fpm.d/docker.conf \
		-v $(PWD)/.docker/api/nginx/default.conf:/etc/nginx/conf.d/default.conf \
		-v $(PWD)/.docker/api/nginx/nginx.conf:/etc/nginx/nginx.conf \
		-v $(PWD)/.docker/api/.bashrc:/root/.bashrc \
		--link $(DB_CONTAINER):db \
		wooj-api

run-api-prod: create-network
	@echo "Запуск production API..."
	@docker run -d \
		--name $(API_CONTAINER)-prod \
		--network $(NETWORK) \
		-p $(API_PORT):80 \
		-e DB_HOST=$(DB_CONTAINER) \
		-e DB_PORT=5432 \
		-e DB_USER=$(DB_USER) \
		-e DB_PASS=$(DB_PASS) \
		-e DB_NAME=$(DB_NAME) \
		-e APP_ENV=production \
		-e APP_DEBUG=false \
		--link $(DB_CONTAINER):db \
		wooj-api-prod

run-front: create-network
	@echo "Запуск фронтенда..."
	@docker run -d \
		--name $(FRONT_CONTAINER) \
		--network $(NETWORK) \
		-p $(FRONT_BUILD_PORT):80 \
		-p $(FRONT_DEV_PORT):5173 \
		-v $(PWD)/front:/var/www \
		-v $(PWD)/.docker/front/nginx/default.conf:/etc/nginx/conf.d/default.conf \
		-v $(PWD)/.docker/front/nginx/nginx.conf:/etc/nginx/nginx.conf \
		-v $(PWD)/.docker/front/.bashrc:/root/.bashrc \
		--link $(API_CONTAINER):api \
		wooj-front

run-mail: create-network
	@echo "Запуск почтового сервера..."
	@docker run -d \
		--name $(MAIL_CONTAINER) \
		--network $(NETWORK) \
		-p $(MAIL_INTERFACE_PORT):80 \
		-p $(MAIL_PORT):25 \
		wooj-mail

run-all: run-db run-api run-front run-mail

# Остановка контейнеров
stop-db:
	@echo "Остановка базы данных..."
	@docker stop $(DB_CONTAINER) 2>/dev/null || true

stop-api:
	@echo "Остановка API..."
	@docker stop $(API_CONTAINER) 2>/dev/null || true

stop-front:
	@echo "Остановка фронтенда..."
	@docker stop $(FRONT_CONTAINER) 2>/dev/null || true

stop-mail:
	@echo "Остановка почтового сервера..."
	@docker stop $(MAIL_CONTAINER) 2>/dev/null || true

stop-all: stop-front stop-api stop-db stop-mail

# Логи контейнеров
logs-db:
	@docker logs -f $(DB_CONTAINER)

logs-api:
	@docker logs -f $(API_CONTAINER)

logs-front:
	@docker logs -f $(FRONT_CONTAINER)

logs-mail:
	@docker logs -f $(MAIL_CONTAINER)

# Вход в контейнер
shell-db:
	@docker exec -it $(DB_CONTAINER) bash

shell-api:
	@docker exec -it $(API_CONTAINER) bash

shell-front:
	@docker exec -it $(FRONT_CONTAINER) bash

shell-mail:
	@docker exec -it $(MAIL_CONTAINER) bash

# Очистка контейнеров и образов
clean-db:
	@echo "Удаление контейнера и образа базы данных..."
	@docker rm -f $(DB_CONTAINER) 2>/dev/null || true
	@docker rmi wooj-db 2>/dev/null || true

clean-api:
	@echo "Удаление контейнера и образа API..."
	@docker rm -f $(API_CONTAINER) 2>/dev/null || true
	@docker rmi wooj-api 2>/dev/null || true

clean-front:
	@echo "Удаление контейнера и образа фронтенда..."
	@docker rm -f $(FRONT_CONTAINER) 2>/dev/null || true
	@docker rmi wooj-front 2>/dev/null || true

clean-mail:
	@echo "Удаление контейнера и образа почтового сервера..."
	@docker rm -f $(MAIL_CONTAINER) 2>/dev/null || true
	@docker rmi wooj-mail 2>/dev/null || true

clean-all: clean-front clean-api clean-db clean-mail
	@echo "Удаление сети..."
	@docker network rm $(NETWORK) 2>/dev/null || true

# Перезапуск контейнеров
restart-db: stop-db run-db
restart-api: stop-api run-api
restart-front: stop-front run-front
restart-mail: stop-mail run-mail
restart-all: stop-all run-all

# Проверка статуса контейнеров
status:
	@echo "Статус контейнеров:"
	@docker ps -a --filter "name=wooj-"

# Установка зависимостей в контейнерах
install-api:
	@echo "Установка зависимостей API..."
	@docker exec $(API_CONTAINER) composer install

install-front:
	@echo "Установка зависимостей фронтенда..."
	@docker exec $(FRONT_CONTAINER) npm install

# Выполнение команд в контейнерах
api-cmd:
	@docker exec $(API_CONTAINER) $(CMD)

front-cmd:
	@docker exec $(FRONT_CONTAINER) $(CMD)

# Примеры использования:
# make api-cmd CMD="php artisan migrate"
# make front-cmd CMD="npm run build"

# Production команды
.PHONY: deploy-prod stop-prod clean-prod logs-prod

deploy-prod: build-all-prod stop-prod
	@echo "Деплой production версии..."
	@make run-db
	@sleep 5
	@make run-api-prod
	@make run-front
	@make run-mail
	@echo "Production деплой завершен!"

stop-prod:
	@echo "Остановка production контейнеров..."
	@docker stop wooj-front wooj-api-prod wooj-db wooj-mail 2>/dev/null || true

clean-prod:
	@echo "Очистка production контейнеров и образов..."
	@docker rm -f wooj-front wooj-api-prod wooj-db wooj-mail 2>/dev/null || true
	@docker rmi wooj-front wooj-api-prod wooj-db wooj-mail 2>/dev/null || true

logs-prod:
	@echo "Логи production контейнеров:"
	@docker logs -f wooj-api-prod
