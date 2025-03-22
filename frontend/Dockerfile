# Imagen base de Node.js
FROM node:20-alpine AS base

# Instalar pnpm globalmente
RUN corepack enable && corepack prepare pnpm@latest --activate

# Establecer directorio de trabajo
WORKDIR /app

# Capa de dependencias
FROM base AS dependencies
# Copiar archivos de configuración
COPY package.json pnpm-lock.yaml* ./
# Instalar dependencias
RUN pnpm install --frozen-lockfile

# Capa de construcción
FROM dependencies AS build
# Copiar todo el código fuente
COPY . .
# Construir la aplicación
RUN pnpm run build

# Capa de producción
FROM base AS runner
# Configurar como entorno de producción
ENV NODE_ENV production
# Crear usuario no privilegiado
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copiar los archivos necesarios para la ejecución
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Configurar los permisos adecuados
RUN chown -R nextjs:nodejs /app
USER nextjs

# Exponer el puerto que usa Next.js
EXPOSE 3002

# Comando para ejecutar la aplicación
CMD ["pnpm", "start"]