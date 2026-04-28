# Usando a versão 22 (pode ser a normal ou a -alpine para ser mais leve)
FROM node:22-alpine

# 1. Instala o pnpm globalmente para que o sistema o reconheça
RUN npm install -g pnpm

# 2. Define a pasta de trabalho
WORKDIR /app

# 3. Copia apenas os arquivos de dependências primeiro
# Isso ajuda o Docker a não reinstalar tudo se você mudar apenas o código
COPY package*.json ./

# 4. Agora sim, instala as dependências do projeto
RUN npm install

# 5. Copia o restante dos arquivos do seu projeto
COPY . .

# 6. Gera o Prisma Client e faz o Build
RUN npx prisma generate
RUN npm run build

# 7. Expõe a porta
EXPOSE 4000

# O CMD do Dockerfile é o "padrão", mas lembre-se que o seu 
# docker-compose.yml está sobrescrevendo isso com o comando de migrate.
CMD ["node", "dist/src/main.js"]