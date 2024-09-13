# Stage 1
FROM  node:latest AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Stage 2
FROM nginx:1.25.2-alpine-slim
# copy everything from stage 1 to the nginx server
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]