# Set the IMAGE_TAG env variable to "app:local" if not already set
export IMAGE_TAG ?= app:local

start: dev
	docker-compose up --remove-orphans app
dev:
	docker build --tag $(IMAGE_TAG) --target dev --rm .
prod:
	docker build --tag $(IMAGE_TAG) --target prod --rm .
integration: prod
	docker-compose up --remove-orphans --abort-on-container-exit --exit-code-from cypress
down:
	docker-compose down --rmi all --remove-orphans
