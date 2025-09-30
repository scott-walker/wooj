FROM node:22-alpine

WORKDIR /app

COPY . .
COPY package*.json ./
RUN npm install

# Чтобы было удобно 🙃😇
RUN apk add --no-cache bash && echo "alias ll='ls -lah'" >> /root/.bashrc

EXPOSE 8080

CMD ["npm", "run", "dev"]
