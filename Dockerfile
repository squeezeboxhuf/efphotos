FROM node:24-alpine AS builder
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app
RUN npm ci
COPY . .

RUN npm run build

FROM node:24-alpine

RUN adduser -D nodeuser
RUN mkdir -p /app
RUN chown nodeuser:nodeuser /app
USER nodeuser
WORKDIR /app
COPY --from=builder --chown=nodeuser:nodeuser /app/build build/
COPY --from=builder --chown=nodeuser:nodeuser /app/node_modules node_modules/
COPY package*.json .

ENV DATABSE_URL='/app/localDB/photos.db'

EXPOSE 3000
CMD [ "node", "build" ]



## docker build -t huf/efphotos:0.1.1RELEASE .
  
# docker run -d \
# --name efphotos \
# --restart unless-stopped \
# --network moonet \
# -v /home/huf/projects/svelte/efphotos/dist:/app/dist \
# -v /home/huf/projects/svelte/efphotos/localDB:/app/localDB \
# -v /home/huf/projects/svelte/efphotos/logs:/app/logs \
# -p 1937:3000 \
# huf/efphotos:0.1.1RELEASE