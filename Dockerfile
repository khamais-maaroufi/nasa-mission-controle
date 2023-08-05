FROM node:18-alpine

WORKDIR /artemis

COPY /server .

USER node

CMD ["npm", "run", "start"]

EXPOSE 8000