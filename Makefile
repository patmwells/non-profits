app: down build start logs

build:
	docker build --tag app:local --target dev --rm ./app
start:
	docker-compose up --detach app
logs:
	docker-compose logs --follow app
shell:
	docker-compose exec app /bin/bash
down:
	docker-compose down
clean:
	docker image prune --all --force
hooks:
	cp -a .hooks/. .git/hooks/
	chmod +x .git/hooks/*
infra:
	cd ops/terraform && terraform apply;
verify:
	heroku login;
	docker build --tag app:local --target prod --rm ./app;
	NODE_ENV=$$(heroku config:get -a non-profits NODE_ENV) docker-compose up --build automation;
	docker-compose down;
	heroku logout;
