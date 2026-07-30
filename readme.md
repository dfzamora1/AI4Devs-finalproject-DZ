# ConectaPH

**Proyecto final AI4Devs · Versión 1.0 · Estado: MVP funcional**

ConectaPH es una aplicación web para gestionar reservas de zonas comunes en
copropiedades. Sustituye agendas y autorizaciones dispersas por un flujo
trazable: el residente consulta disponibilidad, reserva y registra invitados;
vigilancia consulta las reservas aprobadas en modo de solo lectura.

## Propuesta de valor y usuarios

- **Residente:** reserva espacios y administra los invitados de sus reservas.
- **Vigilancia:** verifica residente, unidad e invitados autorizados.
- **Administración:** consulta reservas, usuarios y unidades de su copropiedad.

El MVP cubre autenticación, zonas comunes, disponibilidad, aprobación automática
sin solape, reservas propias, invitados, consulta de vigilancia y consultas
administrativas básicas. No incluye PQRS, cartera, publicaciones, asambleas,
notificaciones, QR ni control general de visitantes.

## Flujo funcional

`login residente → zonas → disponibilidad → reserva APPROVED → detalle → invitados
→ logout → login vigilancia → reservas aprobadas → residente/unidad/invitados`

## Stack y arquitectura

Monorepo npm con SPA React/Vite/TypeScript, API Express/TypeScript/Zod, Prisma y
PostgreSQL 16. Es un monolito modular: el navegador consume la API y esta es la
única autoridad sobre permisos y datos. Consulte
[diagramas C4](ConectaPH-C4-Diagrams.md).

La concurrencia se protege dentro de una transacción mediante un bloqueo asesor
de PostgreSQL y la regla `inicio existente < fin solicitado` y
`fin existente > inicio solicitado`; los intervalos adyacentes son válidos.

## Seguridad

JWT identifica usuario y copropiedad activa. En cada petición se recargan las
asignaciones vigentes de `UserRole`, sus `RolePermission` y `Permission`.
Los roles tienen alcance por `ResidentialComplex`; las consultas filtran además
por copropiedad y, cuando corresponde, por residente propietario. El frontend
solo adapta navegación. Vigilancia no posee permisos de escritura.

## Estructura

- `backend/`: API, esquema Prisma, seed y pruebas.
- `frontend/`: SPA y pruebas de componentes.
- `e2e/`: flujo Playwright contra frontend y API reales.
- `.github/workflows/ci.yml`: instalación, Prisma, typecheck, pruebas y build.
- `docs/evidencias/`: guía de capturas y video.

## Requisitos e instalación

Requiere Node.js 20+, npm y Docker con Compose.

1. Copie `.env.example` a `.env` y `backend/.env.example` a `backend/.env`.
2. Ejecute `npm ci`.
3. Inicie PostgreSQL con `npm run db:up`.
4. Para el esquema actual sin migración versionada, ejecute
   `npm run db:push -w backend`.
5. Cargue datos reproducibles con `npm run db:seed`.
6. Inicie ambos servicios con `npm run dev`.

Frontend: `http://localhost:5173`. API: `http://localhost:3000`.
Health check: `GET http://localhost:3000/health`.

### Variables de entorno

`DATABASE_URL`, `JWT_SECRET` (mínimo 32 caracteres), `JWT_EXPIRES_IN`, `PORT`,
`CORS_ORIGIN` y `VITE_API_BASE_URL`. Los archivos `.env` están ignorados; no
deben versionarse secretos.

### Usuarios de demostración

Contraseña local común: `ConectaPH2026!`.

- `residente@conectaph.local`
- `vigilancia@conectaph.local`
- `administrador@conectaph.local`

Estas credenciales son exclusivamente de demostración y deben cambiarse en un
entorno publicado.

## Comandos y pruebas

```text
npm run db:generate -w backend
npm run typecheck
npm run test
npm run test:integration
npm run build
npm run test:e2e
```

Las pruebas de integración y E2E requieren PostgreSQL con el esquema preparado y
el seed aplicado. Playwright inicia frontend y backend. En la validación local
del 29 de julio de 2026 pasaron inicialmente Prisma Client, typecheck, 9 pruebas
unitarias backend, 2 pruebas frontend, 7 pruebas de integración y build. `npm ci`
completó, pero eliminó el motor Prisma en caché; la regeneración posterior quedó
bloqueada por el certificado TLS del entorno, por lo que la validación posterior
a instalación limpia no quedó en verde.
Chromium y Prisma se instalaron usando el almacén de certificados de Windows
(`NODE_USE_SYSTEM_CA=1`) y el E2E pasó 1/1. Consulte [TESTING.md](TESTING.md).

## Evidencia de funcionamiento

No hay URL pública comprobable en el repositorio. La evidencia reproducible es la
ejecución local descrita arriba. [La guía de evidencias](docs/evidencias/README.md)
indica las capturas reales y el video que Diego debe aportar; no se incluyen
capturas generadas o simuladas.

## Despliegue

No existe despliegue automático ni URL pública verificada. Los pasos, secretos,
CORS, health check y rollback están en [DEPLOYMENT.md](DEPLOYMENT.md).

## Limitaciones y roadmap

- Falta crear y validar una migración inicial versionada; actualmente se usa
  `prisma db push` para preparar entornos efímeros.
- El E2E crea datos únicos, pero no elimina la reserva creada.
- `npm ci` reporta 11 vulnerabilidades en dependencias (3 moderadas, 7 altas y
  1 crítica); deben revisarse sin aplicar actualizaciones forzadas antes de la entrega.
- En este equipo debe usarse el almacén de certificados de Windows
  (`NODE_USE_SYSTEM_CA=1`) para descargar binarios de Prisma y Playwright; no se
  debe desactivar la verificación TLS.
- No se calculó cobertura.
- Como roadmap: migraciones versionadas, despliegue público, evidencia visual y
  ampliación de pruebas UI. Los módulos ajenos a reservas permanecen fuera del MVP.

## Documentos relacionados

[PRD](ConectaPH-PRD.md) · [historias](5-historias-de-usuario.md) ·
[tickets](6-tickets-de-trabajo.md) · [trazabilidad](trazabilidad.md) ·
[prompts](prompts.md) · [agentes](agents.md) · [release](RELEASE.md)

Rama final: `finalproject-DZC`. Etiqueta recomendada, aún no creada:
`v1.0-final-DZC`.
