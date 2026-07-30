# Despliegue de ConectaPH

## Arquitectura

Desplegar tres componentes: SPA estática, API Node.js y PostgreSQL. La API debe
ser el único componente con acceso a la base. No existe despliegue automático
configurado ni URL pública verificada.

## Variables y secretos

Backend: `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `PORT` y `CORS_ORIGIN`.
Frontend: `VITE_API_BASE_URL` durante el build. Guarde contraseña de base y JWT
en el gestor de secretos del proveedor; nunca en Git. Use HTTPS y un
`JWT_SECRET` aleatorio de al menos 32 caracteres.

## Construcción y arranque

```text
npm ci
npm run db:generate -w backend
npm run build
npm run db:migrate -w backend
npm run db:seed -w backend    # solo demostración controlada
npm run start -w backend
```

Sirva `frontend/dist/` como sitio estático con fallback a `index.html`. Configure
`VITE_API_BASE_URL` con la URL HTTPS de la API y `CORS_ORIGIN` con el origen
exacto del frontend. Compruebe `GET /health`.

## Base de datos

El repositorio aún no contiene una migración inicial versionada. Antes de un
despliegue real debe generarse, revisarse y probarse desde una base vacía. El
`db:push` usado por CI es aceptable para una base efímera, no sustituye la
estrategia de migraciones de producción.

## Problemas comunes

- `P1001`: PostgreSQL no es accesible o `DATABASE_URL` es incorrecta.
- CORS: `CORS_ORIGIN` no coincide exactamente con el frontend.
- `401`: JWT expirado o secreto distinto entre instancias.
- Prisma no generado: ejecute `npm run db:generate -w backend`.
- Rutas SPA devuelven 404: configure fallback a `index.html`.

## Rollback básico

Conserve el artefacto anterior de frontend/backend y un respaldo previo de la
base. Si la versión falla, restaure ambos artefactos anteriores. Las migraciones
de datos requieren un plan específico y respaldo probado; no use `db push` ni
borre esquemas como mecanismo de rollback.

## Pendientes para publicación

Elegir proveedor, crear PostgreSQL, generar migración inicial, configurar
secretos/dominios, ejecutar smoke test del flujo, registrar URLs y establecer un
procedimiento de backup. El workflow actual valida calidad; no despliega.
