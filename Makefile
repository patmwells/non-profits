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
release:
	heroku login
	echo $$(heroku auth:token) | docker login --username=_ --password-stdin registry.heroku.com
	docker build --tag non-profits:$$(git rev-parse HEAD) --target prod --rm ./app
	docker tag non-profits:$$(git rev-parse HEAD) registry.heroku.com/non-profits/web
	docker push registry.heroku.com/non-profits/web
	heroku container:release --app non-profits web
	PORT=3000 IMAGE_TAG=app:latest CYPRESS_BASE_URL=https://non-profits.herokuapp.com/ docker-compose up automation
	heroku logout

dev:
	@echo "\n ### DEV environment ### \n";
	set -o allexport && source .env.dev && $(SHELL);
hooks:
	cp -a .hooks/. .git/hooks/
	chmod +x .git/hooks/*
prod:
	@echo "\n ### PROD environment ### \n";
	set -o allexport && source .env.prod && $(SHELL);
verify:
	@echo "\n ### Running local CI with PROD environment ### \n";
	set -o allexport && source .env.prod && $(SHELL) -c "make ci";
