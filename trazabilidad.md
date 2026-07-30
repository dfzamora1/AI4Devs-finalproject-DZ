# Trazabilidad final

Revisión del 29 de julio de 2026. La integración se ejecutó contra PostgreSQL
local y aprobó 7/7. El E2E se ejecutó con Chromium y aprobó 1/1.

| Historia | Criterio verificable | Tickets | Código/API | Prueba | Estado |
|---|---|---|---|---|---|
| HU-001 | Login válido/inválido, sesión, 401 | TK-BE-01, TK-TEST-02 | `/api/auth/login`, `/api/auth/me` | `security.test.ts`, `api.test.ts` | Aprobada |
| HU-002 | Zonas activas de la copropiedad | TK-BE-02, TK-FE-01 | `/api/common-areas`, `Areas` | `api.test.ts`, E2E | Preparada |
| HU-003 | Disponibilidad, horario y adyacencia | TK-BE-02, TK-TEST-01 | `/availability`, `validateSlot` | `reservations.test.ts` | Unitario aprobado |
| HU-004 | Reserva APPROVED y conflicto 409 | TK-BE-03, TK-FE-02 | `POST /api/reservations`, `Reserve` | `reservations.test.ts`, `api.test.ts`, E2E | Aprobada |
| HU-005 | Solo reservas propias | TK-BE-03, TK-SEC-01 | `/reservations/my`, `/:id` | `api.test.ts` | Aprobada |
| HU-006 | Crear y consultar invitado propio | TK-BE-04, TK-FE-02 | rutas `/guests`, `ReservationDetail` | `api.test.ts`, E2E | Aprobada |
| HU-007 | Vigilancia ve aprobadas y no escribe | TK-BE-05, TK-FE-03, TK-SEC-01 | `/api/security/*`, `Security` | `api.test.ts` | Aprobada |
| HU-008 | 403 y alcance RBAC/copropiedad | TK-SEC-01, TK-TEST-02 | `security.ts`, guards/filtros | `security.test.ts`, `api.test.ts` | Aprobada salvo multi-copropiedad |

## Evidencia transversal

- Typecheck y build aprobados: todos los componentes.
- 9 unitarias backend y 2 pruebas frontend aprobadas.
- CI: `.github/workflows/ci.yml` genera Prisma, prepara PostgreSQL efímero,
  ejecuta typecheck, unitarias/frontend, integración y build.
- E2E: `e2e/resident-flow.spec.ts`, 1/1 aprobado.

## Brechas

- Falta validar aislamiento entre dos copropiedades distintas.
- Falta migración inicial versionada.
- Falta evidencia visual y ejecución remota del workflow.
