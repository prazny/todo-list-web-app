# Use an official node runtime as a parent image
FROM node:16

WORKDIR /usr/src/front

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

CMD ["alembic upgrade head"]

COPY . /front

EXPOSE 3000

CMD ["npm", "start"]

