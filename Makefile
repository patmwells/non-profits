app: down build start logs

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
hooks:
	cp -a .hooks/. .git/hooks/
	chmod +x .git/hooks/*
dev:
	@echo "\n ### DEV environment ### \n";
	set -o allexport && source .env.dev && $(SHELL);
prod:
	@echo "\n ### PROD environment ### \n";
	set -o allexport && source .env.prod && $(SHELL);
verify:
	@echo "\n ### Running local CI with PROD environment ### \n";
	set -o allexport && source .env.prod && $(SHELL) -c "make ci";
release:
	heroku login;
	echo $$(heroku auth:token) | docker login --username=_ --password-stdin registry.heroku.com;
	docker build --tag non-profits:latest --target prod --rm ./app;
	docker tag non-profits:latest registry.heroku.com/non-profits/web;
	docker push registry.heroku.com/non-profits/web;
	heroku container:release --app non-profits web;
	heroku logout;
