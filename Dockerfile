FROM node:22.12 AS builder

ARG VITE_BASE_API_URL
ENV VITE_BASE_API_URL=$VITE_BASE_API_URL

COPY ./web /opt/web
WORKDIR /opt/web
RUN npm i
RUN npm run build

FROM node:22.12-alpine3.21

COPY ./api /opt/users-api
WORKDIR /opt/users-api
RUN npm i --omit=dev
COPY --from=builder /opt/web/dist /opt/users-api/src/web/build

EXPOSE 3000

CMD ["npm", "start"]
