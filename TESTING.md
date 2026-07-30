# Estrategia de pruebas

La pirámide combina reglas puras de reserva y RBAC, componentes de autenticación,
API real con PostgreSQL y un recorrido Playwright contra frontend y backend.

## Suites

- Unitarias backend: solape, adyacencia, rango inválido, capacidad, horario,
  permiso vigente/inexistente y relación residente–unidad.
- Frontend: login, sesión y navegación condicionada por permisos.
- Integración: login válido/inválido, `401`, sesión, reserva, conflicto `409`,
  invitados, vigilancia de solo lectura, `403` administrativo y aislamiento
  horizontal.
- E2E: residente crea reserva aprobada y registra un invitado.

## Preparación y ejecución

```text
npm ci
npm run db:up
npm run db:generate -w backend
npm run db:push -w backend
npm run db:seed
npm run test
npm run test:integration
npx playwright install chromium
npm run test:e2e
```

Las suites de integración y E2E usan la base indicada por `DATABASE_URL`. No
deben apuntar a una base con información real. El CI crea PostgreSQL efímero,
aplica `db:push` y seed antes de integración.

## Resultados reales del 29 de julio de 2026

| Comando | Resultado | Aprobadas | Fallidas |
|---|---:|---:|---:|
| `npm run db:generate -w backend` | correcto | n/a | 0 |
| `npm run typecheck` | correcto | n/a | 0 |
| `npm run test` | correcto | 11 | 0 |
| `npm run build` | correcto | n/a | 0 |
| `npm run test:integration` | correcto | 7 | 0 |
| `npm run test:e2e` | correcto después de alinear selectores con la UI | 1 | 0 |
| `NODE_USE_SYSTEM_CA=1; npx playwright install chromium` | correcto | n/a | 0 |
| `npm ci` | correcto; auditó 11 vulnerabilidades | n/a | 0 |
| Prisma después de `npm ci`, con CA del sistema | correcto | n/a | 0 |

El primer intento de Prisma y Vitest dentro del sandbox falló con `spawn EPERM`;
la repetición fuera del sandbox fue correcta. El primer E2E además detectó y
permitió corregir el comando de arranque de Vite. No se desactivó la validación
TLS para descargar Chromium ni Prisma. Los resultados verdes anteriores a
`npm ci` motivaron el uso de `NODE_USE_SYSTEM_CA=1`, que permitió instalar
Chromium y regenerar Prisma sin desactivar TLS. No se calculó cobertura. La
evidencia visual y del pipeline debe provenir de ejecuciones reales.
