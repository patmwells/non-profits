FROM node:latest as base
WORKDIR /home/node/app

FROM base as dev
CMD /bin/bash -c "npm run dev:build; npm run dev:build:watch & npm run dev:start;"

FROM base as build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run task:lint
RUN npm run prod:build
RUN npm prune --production

FROM base as prod
COPY --from=build /home/node/app/bin ./bin
COPY --from=build /home/node/app/package.json .
COPY --from=build /home/node/app/node_modules ./node_modules
USER node
CMD ["npm", "run", "prod:start"]