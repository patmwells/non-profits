# Set the IMAGE_TAG env variable to "app:local" if not already set
export IMAGE_TAG ?= app:local

.PHONY: env automation

dev: dev-env dev-build dev-start logs

prod: prod-env prod-build prod-start logs

ci: prod-env prod-build automation down clean

dev-env:
	cp .env.dev .env
dev-build:
	docker build --tag $(IMAGE_TAG) --target dev --rm ./app
dev-start:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --detach app
prod-env:
	cp .env.prod .env
prod-build:
	docker build --tag $(IMAGE_TAG) --target prod --rm ./app
prod-start:
	docker-compose up --detach app
shell:
	docker-compose exec app /bin/bash
logs:
	docker-compose logs --follow app
automation:
	docker-compose up --build automation
down:
	docker-compose down
clean:
	docker image prune --all --force