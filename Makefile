.PHONY: up build down

up:
	docker-compose up
build:
	docker-compose build
down:
	docker-compose down --rmi all --remove-orphans