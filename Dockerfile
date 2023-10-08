FROM node:lts-stretch-slim
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm install -g typescript@5.1.3
RUN tsc index.ts
CMD ["node", "index.js"]
