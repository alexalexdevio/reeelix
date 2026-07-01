# Базовый образ Node JS (легковесная версия на Alpine Linux)
FROM node:18-alpine

# Создаем робочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект внутрь контейнера
COPY . .

# Собираем typescript
RUN npm run build

# Задаем команду, которая будет виполняться при запуске контейнера
# Это может быть как dev так и prod. Пока что указываем prod
CMD ["npm", "run", "start:prod"]
