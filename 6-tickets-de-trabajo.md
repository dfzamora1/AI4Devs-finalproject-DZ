# Tickets de trabajo — ConectaPH

Estados revisados al 29 de julio de 2026. Categorías usadas: PRODUCT, DOCUMENTATION, DATABASE, BACKEND, FRONTEND, SECURITY, TEST y DEVOPS.

## Resumen y trazabilidad

| Código | Categoría | Título | Historia | Estimación | Estado real |
|---|---|---|---|---|---|
| TK-PROD-01 | PRODUCT | Delimitar MVP de reservas | HU-001–HU-008 | S | Terminado |
| TK-DOC-01 | DOCUMENTATION | Mantener trazabilidad funcional | HU-001–HU-008 | M | En progreso |
| TK-DB-01 | DATABASE | Modelo Prisma, migración y seed | HU-001, HU-004, HU-006, HU-008 | L | Parcial |
| TK-BE-01 | BACKEND | Autenticación y perfil | HU-001 | M | Implementado; integración pendiente |
| TK-BE-02 | BACKEND | Zonas y disponibilidad | HU-002, HU-003 | M | Implementado; integración pendiente |
| TK-BE-03 | BACKEND | Crear y consultar reservas | HU-004, HU-005 | L | Implementado; pruebas parciales |
| TK-BE-04 | BACKEND | Invitados propios | HU-006 | M | Implementado; integración pendiente |
| TK-BE-05 | BACKEND | Consulta de vigilancia | HU-007 | M | Implementado; integración pendiente |
| TK-FE-01 | FRONTEND | Login y zonas comunes | HU-001–HU-003 | M | Implementado; validación visual pendiente |
| TK-FE-02 | FRONTEND | Reservas propias e invitados | HU-004–HU-006 | L | Implementado; E2E pendiente |
| TK-FE-03 | FRONTEND | Vista de vigilancia | HU-007 | M | Implementado; E2E pendiente |
| TK-SEC-01 | SECURITY | RBAC, vigencia y alcance | HU-001, HU-005–HU-008 | L | Implementado; matriz pendiente |
| TK-TEST-01 | TEST | Reglas unitarias de reserva | HU-003, HU-004 | M | Parcialmente terminado |
| TK-TEST-02 | TEST | Integración, autorización y E2E | HU-001–HU-008 | L | Implementado; ejecución con BD pendiente |
| TK-DEVOPS-01 | DEVOPS | PostgreSQL, build y automatización | HU-001–HU-008 | M | Implementado; CI remoto pendiente |

## Campos detallados

### TK-PROD-01 — Delimitar MVP de reservas

- **Descripción:** Definir actores, flujo residente–vigilancia y límites de la segunda entrega.
- **Tipo/categoría:** PRODUCT. **Historia:** HU-001–HU-008. **Estimación:** S. **Estado:** Terminado.
- **Dependencias:** Ninguna.
- **Criterios de aceptación:** Ocho historias Must Have numeradas; administración identificada como Should Have; pagos, PQRS, QR y control general de visitantes fuera de alcance.
- **Evidencia:** `ConectaPH-PRD.md`, `5-historias-de-usuario.md`.

### TK-DOC-01 — Mantener trazabilidad funcional

- **Descripción:** Alinear historias, tickets, permisos, endpoints, pruebas y estado real.
- **Tipo/categoría:** DOCUMENTATION. **Historia:** HU-001–HU-008. **Estimación:** M. **Estado:** En progreso.
- **Dependencias:** TK-PROD-01 y auditoría del código.
- **Criterios de aceptación:** Cada HU incluye actor, necesidad, beneficio, prioridad, alcance, fuera de alcance, precondiciones, reglas, entidades, permisos, endpoints, dependencias, criterios y pruebas.
- **Evidencia:** este documento y `5-historias-de-usuario.md`.

### TK-DB-01 — Modelo Prisma, migración y seed

- **Descripción:** Modelar multi-copropiedad, unidades, RBAC, reservas e invitados y cargar datos demo.
- **Tipo/categoría:** DATABASE. **Historia:** HU-001, HU-004, HU-006, HU-008. **Estimación:** L. **Estado:** Parcial.
- **Dependencias:** PostgreSQL, Prisma, TK-PROD-01.
- **Criterios de aceptación:** Esquema válido; seed con roles/permisos/usuarios/unidad/zonas; migración versionada ejecutable.
- **Evidencia:** `backend/prisma/schema.prisma`, `backend/prisma/seed.ts`; falta `backend/prisma/migrations`.

### TK-BE-01 — Autenticación y perfil

- **Descripción:** Implementar login bcrypt/JWT y `/me` con contexto.
- **Tipo/categoría:** BACKEND. **Historia:** HU-001. **Estimación:** M. **Estado:** Implementado; integración pendiente.
- **Dependencias:** TK-DB-01, TK-SEC-01.
- **Criterios de aceptación:** Login válido/ inválido; complejo vigente; `/me` devuelve roles, permisos y unidad.
- **Evidencia:** `backend/src/app.ts`, `backend/src/security.ts`.

### TK-BE-02 — Zonas y disponibilidad

- **Descripción:** Exponer zonas activas y calcular disponibilidad.
- **Tipo/categoría:** BACKEND. **Historia:** HU-002, HU-003. **Estimación:** M. **Estado:** Implementado; integración pendiente.
- **Dependencias:** TK-BE-01, TK-DB-01.
- **Criterios de aceptación:** Filtro por complejo; `403/404`; solapamiento y adyacencia correctos.
- **Evidencia:** `backend/src/app.ts`, `backend/tests/unit/reservations.test.ts`.

### TK-BE-03 — Crear y consultar reservas

- **Descripción:** Aprobar sin conflicto, validar reglas y limitar consultas al propietario.
- **Tipo/categoría:** BACKEND. **Historia:** HU-004, HU-005. **Estimación:** L. **Estado:** Implementado; pruebas parciales.
- **Dependencias:** TK-BE-02, TK-DB-01, TK-SEC-01.
- **Criterios de aceptación:** `201 APPROVED`; conflicto `409`; reglas `422`; solo reservas propias; transacción serializable.
- **Evidencia:** `backend/src/reservations.ts`, `backend/src/app.ts`, pruebas unitarias.

### TK-BE-04 — Invitados propios

- **Descripción:** Crear/listar invitados con propiedad y eliminar como Should Have.
- **Tipo/categoría:** BACKEND. **Historia:** HU-006. **Estimación:** M. **Estado:** Implementado; integración pendiente.
- **Dependencias:** TK-BE-03, TK-SEC-01.
- **Criterios de aceptación:** Persistencia; documento único por reserva; reserva ajena no expuesta.
- **Evidencia:** modelo `Guest` y rutas en `backend/src/app.ts`.

### TK-BE-05 — Consulta de vigilancia

- **Descripción:** Listar por fecha, mostrar detalle e invitados autorizados.
- **Tipo/categoría:** BACKEND. **Historia:** HU-007. **Estimación:** M. **Estado:** Implementado; integración pendiente.
- **Dependencias:** TK-BE-03, TK-BE-04, TK-SEC-01.
- **Criterios de aceptación:** Solo `APPROVED`, fecha y complejo activos; incluye residente/unidad; cero escritura.
- **Evidencia:** rutas `/api/security/*` en `backend/src/app.ts`.

### TK-FE-01 — Login y zonas comunes

- **Descripción:** Construir sesión, navegación, zonas y disponibilidad.
- **Tipo/categoría:** FRONTEND. **Historia:** HU-001–HU-003. **Estimación:** M. **Estado:** Implementado; validación visual pendiente.
- **Dependencias:** TK-BE-01, TK-BE-02.
- **Criterios de aceptación:** Login persiste sesión; carga/error/vacío; rutas protegidas y consumo real de API.
- **Evidencia:** `frontend/src/auth.tsx`, `frontend/src/api.ts`, `frontend/src/pages.tsx`.

### TK-FE-02 — Reservas propias e invitados

- **Descripción:** Formulario, confirmación, lista/detalle e invitados.
- **Tipo/categoría:** FRONTEND. **Historia:** HU-004–HU-006. **Estimación:** L. **Estado:** Implementado; E2E pendiente.
- **Dependencias:** TK-BE-03, TK-BE-04, TK-FE-01.
- **Criterios de aceptación:** Flujo navegable con estados de carga/error y API persistente.
- **Evidencia:** `frontend/src/pages.tsx`, `e2e/resident-flow.spec.ts` (presencia, no ejecución acreditada).

### TK-FE-03 — Vista de vigilancia

- **Descripción:** Selector de fecha, reservas aprobadas y detalle operativo.
- **Tipo/categoría:** FRONTEND. **Historia:** HU-007. **Estimación:** M. **Estado:** Implementado; E2E pendiente.
- **Dependencias:** TK-BE-05, TK-FE-01.
- **Criterios de aceptación:** Solo navegación autorizada; visualiza zona, unidad, residente e invitados; sin acciones de escritura.
- **Evidencia:** `frontend/src/pages.tsx`, `frontend/src/App.tsx`.

### TK-SEC-01 — RBAC, vigencia y alcance

- **Descripción:** Cargar permisos persistidos y aplicar complejo/propiedad.
- **Tipo/categoría:** SECURITY. **Historia:** HU-001, HU-005–HU-008. **Estimación:** L. **Estado:** Implementado; matriz pendiente.
- **Dependencias:** TK-DB-01.
- **Criterios de aceptación:** `403` sin permiso; rol vencido no autoriza; complejo proviene del token; SECURITY solo lectura; residente no ve recursos ajenos.
- **Evidencia:** `backend/src/security.ts`, filtros en `backend/src/app.ts`, seed RBAC.

### TK-TEST-01 — Reglas unitarias de reserva

- **Descripción:** Probar solapamiento, adyacencia, rango, horario y capacidad.
- **Tipo/categoría:** TEST. **Historia:** HU-003, HU-004. **Estimación:** M. **Estado:** Parcialmente terminado.
- **Dependencias:** TK-BE-03.
- **Criterios de aceptación:** Tests deterministas para cada regla y errores esperados.
- **Evidencia:** `backend/tests/unit/reservations.test.ts`; faltan unidad-complejo y concurrencia real.

### TK-TEST-02 — Integración, autorización y E2E

- **Descripción:** Cubrir el flujo persistente y matriz positiva/negativa.
- **Tipo/categoría:** TEST. **Historia:** HU-001–HU-008. **Estimación:** L. **Estado:** Implementado; ejecución con BD pendiente.
- **Dependencias:** todos los tickets BE/FE/SEC y TK-DEVOPS-01.
- **Criterios de aceptación:** Login, `/me`, reserva/conflicto, invitados, vigilancia, rol vencido, permiso ausente, complejo y recurso ajeno pasan contra PostgreSQL.
- **Evidencia:** `backend/tests/integration/api.test.ts` y `e2e/resident-flow.spec.ts`; sin resultado acreditado por ausencia local de PostgreSQL.

### TK-DEVOPS-01 — PostgreSQL, build y automatización

- **Descripción:** Levantar BD, migrar, sembrar, typecheck, probar y compilar reproduciblemente.
- **Tipo/categoría:** DEVOPS. **Historia:** HU-001–HU-008. **Estimación:** M. **Estado:** Implementado; CI remoto pendiente.
- **Dependencias:** TK-DB-01 y TK-TEST-02.
- **Criterios de aceptación:** Docker saludable; migración/seed exitosos; tests y builds terminan en cero; `/health` responde.
- **Evidencia:** `docker-compose.yml`, `package.json`, `backend/package.json`, `.env.example`; sin resultado ejecutado acreditado.
