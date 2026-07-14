# ConectaPH — segunda entrega funcional

**Autor:** Diego F. Zamora Carmona · **Dominio:** Propiedad horizontal · **MVP:** reservas de zonas comunes

ConectaPH conecta residentes, administración y vigilancia. Esta entrega implementa un monolito modular: el residente inicia sesión, consulta zonas y disponibilidad, obtiene aprobación automática si no hay solape, registra invitados; vigilancia consulta reservas aprobadas e invitados autorizados. Los datos se persisten en PostgreSQL mediante Prisma.

## Estado y alcance real

Implementado: JWT, contexto de copropiedad, RBAC persistido, zonas, disponibilidad, reservas propias, detección de concurrencia, invitados, consultas de vigilancia y consultas administrativas básicas; frontend React con rutas y navegación por permiso. Cancelación y CRUD administrativo avanzado quedan pendientes.

Stack: Node.js 20+, Express, TypeScript estricto, Zod, Prisma, PostgreSQL 16, bcrypt, JWT, React, Vite, Vitest, Testing Library y Playwright.

## Inicio rápido

1. Copie `.env.example` como `.env` y `backend/.env.example` como `backend/.env`.
2. Ejecute `npm install` y `npm run db:up`.
3. Ejecute `npm run db:migrate` y `npm run db:seed`.
4. Ejecute `npm run dev`; UI en `http://localhost:5173`, API en `http://localhost:3000`.

Credenciales solo de desarrollo (contraseña común `ConectaPH2026!`):

- `residente@conectaph.local`
- `administrador@conectaph.local`
- `vigilancia@conectaph.local`

## Arquitectura y seguridad

El navegador consume una API Express; los módulos auth, zonas, reservas, invitados, vigilancia y administración comparten Prisma/PostgreSQL. El JWT identifica usuario y copropiedad activa, pero cada petición vuelve a cargar asignaciones activas/vigentes y permisos desde BD. La autorización combina permiso atómico, copropiedad y propiedad del recurso. `SECURITY` es solo lectura. El cliente nunca determina libremente `complexId`.

La concurrencia usa una transacción serializable y busca solape con `existing.startAt < requested.endAt AND existing.endAt > requested.startAt`; por ello los intervalos adyacentes son válidos. La reserva conserva residente y unidad responsables.

## Comandos

`npm run dev`, `dev:backend`, `dev:frontend`, `db:up`, `db:down`, `db:migrate`, `db:seed`, `typecheck`, `test`, `test:e2e`, `build`.

## API

Todas las respuestas usan `{ success, data, message }` o `{ success:false, error:{code,message} }`.

- `GET /health`
- `POST /api/auth/login`; `GET /api/auth/me`
- `GET /api/common-areas`; `GET /api/common-areas/:id`; `GET /api/common-areas/:id/availability`
- `POST /api/reservations`; `GET /api/reservations/my`; `GET /api/reservations/:id`
- `POST|GET /api/reservations/:id/guests`
- `GET /api/security/reservations`; `GET /api/security/reservations/:id`
- `GET /api/admin/reservations`; `GET /api/admin/users`; `GET /api/admin/property-units`

## Estructura y documentación

`backend/` contiene API, Prisma, seed y pruebas; `frontend/` la SPA; `e2e/` Playwright; `docker-compose.yml` PostgreSQL; `.github/` CI. Véanse [ConectaPH-PRD.md](ConectaPH-PRD.md), [ConectaPH-C4-Diagrams.md](ConectaPH-C4-Diagrams.md) y [prompts.md](prompts.md).

## Limitaciones

No se implementan pagos, cartera, PQRS, notificaciones, QR, control de ingreso/salida ni editor de roles. El E2E requiere PostgreSQL migrado y sembrado. Las credenciales son exclusivamente locales. No existe despliegue ni PR remoto asociado a esta entrega.

## Pull Request sugerido

**Título:** Entrega 2 - MVP funcional de reservas ConectaPH  
**Rama:** `feature-entrega2-DZC`

Describir flujo E2E, RBAC, alcance por copropiedad, migración/seed, comandos ejecutados, evidencias, riesgos y pendientes. Este texto no afirma que el PR exista.
