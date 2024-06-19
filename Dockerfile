# Используем образ Node.js для сборки приложения
FROM node:20 AS build

# Создаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код в контейнер
COPY . .

# Собираем Angular-приложение
RUN npm run build --prod

# Используем Nginx для сервировки собранного приложения
FROM nginx:1.17.1-alpine
COPY --from=build /app/dist/ahorro-compras/browser /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
