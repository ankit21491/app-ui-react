# set the base image to build from
FROM node:alpine

# set the working directory
WORKDIR /app

# copy package files
COPY package.json ./
COPY package-lock.json ./

# install dependencies
RUN npm install

# copy everything to /app directory
COPY ./ ./

# run the app
CMD ["npm", "start"]

# USING NGINX
# npm run build (Run this command in react directory of your local machine)
# FROM nginx:alpine
# COPY build/ /usr/share/nginx/html