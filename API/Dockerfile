FROM node:current-alpine
WORKDIR /
COPY ["package.json", "yarn.lock*", "npm-shrinkwrap.json*", "./"]
# will need to use multi-stage builds so that we can install dev deps for compiling and only prod deps for running...
RUN yarn install --silent && mv node_modules ../
RUN yarn add ts-node
RUN yarn global add sequelize-cli
COPY . .
RUN yarn run build
EXPOSE 80
CMD ["yarn", "start"]