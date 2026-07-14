# Trazabilidad de la segunda entrega

Reconstruida el 13 de julio de 2026 desde el código. “Código presente” no equivale a una ejecución E2E satisfactoria.

| Historia | Criterio | Ticket | Componente | Endpoint o pantalla | Prueba | Estado |
|---|---|---|---|---|---|---|
| HU-001 | Login válido/inválido y contexto vigente | TK-BE-01, TK-SEC-01, TK-TEST-02 | `app.ts`, `security.ts`, `auth.tsx` | Login, `POST /auth/login`, `GET /auth/me` | Vigencia en `security.test.ts`; sin HTTP | Parcial |
| HU-002 | Solo zonas activas de la copropiedad | TK-BE-02, TK-FE-01 | `app.ts`, `pages.tsx` | Zonas, `GET /common-areas*` | Sin integración | Código presente |
| HU-003 | Cruce rechazado y adyacencia válida | TK-BE-02, TK-TEST-01 | `app.ts`, `reservations.ts` | `GET .../availability` | `reservations.test.ts` | Prueba unitaria presente |
| HU-004 | Aprobar reserva válida; conflicto 409 | TK-BE-03, TK-TEST-01, TK-TEST-02 | `reservations.ts` | Reserva, `POST /reservations` | Reglas unitarias; sin HTTP/BD | Parcial |
| HU-005 | Listar únicamente reservas propias | TK-BE-03, TK-FE-02, TK-SEC-01 | `app.ts`, `pages.tsx` | Mis reservas, `GET /reservations/my` | Sin integración | Código presente |
| HU-006 | Crear/listar/eliminar invitado propio | TK-BE-04, TK-FE-02, TK-TEST-02 | `app.ts`, `pages.tsx`, `Guest` | Detalle y rutas `/guests` | E2E desalineado | Defecto contractual abierto |
| HU-007 | Vigilancia consulta aprobadas e invitados | TK-BE-05, TK-FE-03, TK-SEC-01 | `app.ts`, `pages.tsx`, seed | Vigilancia, `/api/security/*` | Sin integración negativa | Código presente |
| HU-008 | Permiso, vigencia, copropiedad y propiedad | TK-SEC-01, TK-TEST-02 | `security.ts`, filtros de `app.ts` | Todas las rutas `/api` | Vigencia unitaria | Parcial; faltan guards explícitos |

## Brechas explícitas

- **Historias sin ticket:** ninguna.
- **Tickets sin prueba concluyente:** documentación, migración/seed, frontend, vigilancia, integración y DevOps.
- **Criterios sin evidencia:** migración desde cero, persistencia, respuestas HTTP 401/403/409, concurrencia real, aislamiento multi-copropiedad, E2E residente y vigilancia, lint/build integral.
- **Endpoints documentados sin implementación:** no se presentan como reales CRUD administrativo de zonas ni cancelación administrativa. `RESERVATION_CANCEL_ALL` existe, pero carece de endpoint.
- **Código sin historia independiente:** cancelación propia, eliminación de invitado y consultas administrativas son alcance adicional integrado en HU-005/HU-006/HU-008.
- **Documentación heredada fuera del MVP:** registro público, aprobación manual, notificaciones y control de entradas/salidas.

## Pruebas localizadas

- `backend/tests/unit/reservations.test.ts`: solape, adyacencia, rango, horario y capacidad.
- `backend/tests/unit/security.test.ts`: asignación vigente, vencida e inactiva.
- `frontend/src/test/auth.test.tsx`: sesión y protección de rutas.
- `e2e/resident-flow.spec.ts`: intención E2E, aún desalineada con la UI y el contrato de invitados.
