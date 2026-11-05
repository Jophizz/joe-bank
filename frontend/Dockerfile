# Build stage
FROM node:24 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Empty so the app calls /api/... on the same address, and Nginx passes it to the backend
ENV REACT_APP_API_URL=""
RUN npm run build

# Serve stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
