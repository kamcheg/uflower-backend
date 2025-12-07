FROM node:20-alpine AS build

WORKDIR /app

# Ускоряем установку зависимостей
COPY package*.json ./
RUN npm ci

# Копируем исходники и билдим
COPY . .
RUN npm run build

# Прод-образ
FROM node:20-alpine AS prod

WORKDIR /app
ENV NODE_ENV=production

# Копируем только нужное
COPY package*.json ./
RUN npm ci --only=production

COPY --from=build /app/dist ./dist

# Папка для загрузок (если backend сам пишет туда)
RUN mkdir -p /app/uploads

EXPOSE 4000

CMD ["node", "dist/main.js"]
# или если есть скрипт:
# CMD ["npm", "run", "start:prod"]
