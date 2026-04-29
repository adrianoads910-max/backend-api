# ─────────────────────────────────────────
# Stage 1: Builder
# ─────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Copia manifests primeiro (cache de dependências)
COPY package.json package-lock.json ./

# Instala TODAS as dependências (dev incluído, necessário pro build)
RUN npm ci

# Copia o restante do código
COPY . .

# Gera o Prisma Client e compila
RUN npx prisma generate
RUN npm run build

# ─────────────────────────────────────────
# Stage 2: Runner (imagem final enxuta)
# ─────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

# Copia apenas o necessário do builder
COPY package.json package-lock.json ./

# Somente dependências de produção
RUN npm ci --omit=dev

# Copia o build compilado
COPY --from=builder /app/dist ./dist

# Copia o Prisma (schema + client gerado)
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 4000

CMD ["node", "dist/src/main.js"]