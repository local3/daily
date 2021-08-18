FROM node:12.18.3-alpine

ENV APP_HOME /app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME
# COPY ./front ./app
RUN apk update 
RUN npm install
RUN yarn install
ADD . ../$APP_HOME
CMD [ "npm", "run", "start" ]
