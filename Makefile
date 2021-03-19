dev:
	@echo "\n ### DEV environment ### \n";
	set -o allexport && source .env.dev && $(SHELL);
prod:
	@echo "\n ### PROD environment ### \n";
	set -o allexport && source .env.prod && $(SHELL);

app: build start logs

ci: build automation down

build:
	docker build --tag $(IMAGE_TAG) --target $(BUILD_TARGET) --rm ./app
start:
	docker-compose $(COMPOSE_CONFIGS) up --detach app
logs:
	docker-compose logs --follow app
shell:
	docker-compose exec app /bin/bash
automation:
	docker-compose $(COMPOSE_CONFIGS) up --build automation
down:
	docker-compose down
clean:
	docker image prune --all --force