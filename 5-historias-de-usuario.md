# Historias de usuario — ConectaPH

Estado basado en auditoría estática del repositorio al 13 de julio de 2026. “Implementada” indica código existente, no ejecución E2E comprobada.

## HU-001 — Autenticarse en el sistema

- **Actor:** Usuario registrado.
- **Necesidad:** Iniciar sesión y recuperar su contexto vigente.
- **Beneficio:** Acceder de forma segura a su copropiedad.
- **Prioridad / Estado:** Must Have / Implementada; integración pendiente.
- **Alcance:** Login con bcrypt/JWT y consulta de usuario, complejo, roles, permisos y unidad principal.
- **Fuera de alcance:** Registro público, refresh tokens y recuperación de contraseña.
- **Precondiciones:** Usuario activo, credenciales válidas y `UserRole` activo y vigente.
- **Reglas:** Mensaje de autenticación genérico; el complejo se incorpora al token; las asignaciones se recargan desde BD.
- **Entidades:** `User`, `UserRole`, `Role`, `Permission`, `ResidentialComplex`, `UserPropertyUnit`.
- **Permisos / endpoints:** `PROFILE_VIEW`; `POST /api/auth/login`, `GET /api/auth/me`.
- **Dependencias:** HU-008; TK-DB-01, TK-BE-01, TK-SEC-01.
- **Pruebas relacionadas:** rol vigente/vencido en `backend/tests/unit/security.test.ts`; faltan integración de login y `/me`.
- **Evidencia:** `backend/src/app.ts`, `backend/src/security.ts`, `frontend/src/auth.tsx`.

**Criterios:** Given credenciales y asignación vigentes, when inicia sesión, then recibe JWT; Given credenciales inválidas, then recibe `401`; Given JWT válido, when consulta `/me`, then recibe contexto y permisos.

## HU-002 — Consultar zonas comunes

- **Actor:** Residente.
- **Necesidad:** Consultar zonas activas y su detalle.
- **Beneficio:** Elegir una zona reservable.
- **Prioridad / Estado:** Must Have / Implementada; integración pendiente.
- **Alcance:** Colección y detalle limitados al complejo activo.
- **Fuera de alcance:** CRUD administrativo avanzado.
- **Precondiciones:** Sesión válida y permiso `COMMON_AREA_VIEW`.
- **Reglas:** Solo zonas activas; el cliente no determina el `complexId`.
- **Entidades:** `CommonArea`, `ResidentialComplex`.
- **Permisos / endpoints:** `COMMON_AREA_VIEW`; `GET /api/common-areas`, `GET /api/common-areas/:id`.
- **Dependencias:** HU-001, HU-008; TK-BE-02, TK-FE-01.
- **Pruebas relacionadas:** Pendientes casos `200`, `403`, `404` y aislamiento.
- **Evidencia:** `backend/src/app.ts`, `frontend/src/pages.tsx`.

**Criterios:** Given permiso vigente, when lista, then recibe solo zonas activas de su complejo; Given una zona ajena/inexistente, then recibe `404`; Given ausencia de permiso, then recibe `403`.

## HU-003 — Consultar disponibilidad

- **Actor:** Residente.
- **Necesidad:** Verificar fecha y franja horaria.
- **Beneficio:** Evitar solicitudes incompatibles.
- **Prioridad / Estado:** Must Have / Implementada; integración pendiente.
- **Alcance:** Disponibilidad por zona, fecha, inicio y fin.
- **Fuera de alcance:** Calendario recurrente, feriados y bloqueos administrativos.
- **Precondiciones:** Zona activa del complejo y permiso `AVAILABILITY_VIEW`.
- **Reglas:** Hay conflicto si `startAt < requestedEnd` y `endAt > requestedStart`; la adyacencia se permite.
- **Entidades:** `CommonArea`, `Reservation`.
- **Permisos / endpoints:** `AVAILABILITY_VIEW`; `GET /api/common-areas/:id/availability`.
- **Dependencias:** HU-001, HU-002, HU-008; TK-BE-02, TK-TEST-01.
- **Pruebas relacionadas:** Solapamiento y adyacencia en `backend/tests/unit/reservations.test.ts`; endpoint pendiente.
- **Evidencia:** `backend/src/app.ts`, `backend/src/reservations.ts`.

**Criterios:** Given franja libre, then `available=true`; Given cruce aprobado, then `available=false`; Given intervalos adyacentes, then se consideran disponibles.

## HU-004 — Crear reserva con aprobación automática

- **Actor:** Residente.
- **Necesidad:** Reservar una zona libre.
- **Beneficio:** Obtener aprobación inmediata y trazable.
- **Prioridad / Estado:** Must Have / Implementada; pruebas parciales.
- **Alcance:** Validación de unidad principal, horario, capacidad, conflicto y persistencia `APPROVED`.
- **Fuera de alcance:** Aprobación manual, pagos y recurrencia.
- **Precondiciones:** Rol/permisos vigentes, zona activa y unidad principal activa del mismo complejo.
- **Reglas:** Rango positivo, mismo día, dentro del horario, asistentes entre 1 y capacidad; conflicto devuelve `409`; bloqueo transaccional por zona.
- **Entidades:** `Reservation`, `CommonArea`, `PropertyUnit`, `UserPropertyUnit`, `User`.
- **Permisos / endpoints:** `RESERVATION_CREATE`; `POST /api/reservations`.
- **Dependencias:** HU-001–HU-003, HU-008; TK-BE-03, TK-DB-01, TK-TEST-01.
- **Pruebas relacionadas:** Rango, horario, capacidad, solapamiento y adyacencia en `backend/tests/unit/reservations.test.ts`; concurrencia PostgreSQL pendiente.
- **Evidencia:** `backend/src/reservations.ts`, `backend/src/app.ts`.

**Criterios:** Given datos válidos y franja libre, when crea, then persiste `APPROVED` y responde `201`; Given conflicto, then `409 RESERVATION_CONFLICT`; Given regla inválida, then `422`.

## HU-005 — Consultar reservas propias

- **Actor:** Residente.
- **Necesidad:** Listar y abrir sus reservas.
- **Beneficio:** Dar seguimiento a sus solicitudes sin exponer las de terceros.
- **Prioridad / Estado:** Must Have / Implementada; integración pendiente.
- **Alcance:** Lista y detalle propios dentro del complejo activo; cancelación futura existe como Should Have.
- **Fuera de alcance:** Consultar reservas de otros residentes o complejos.
- **Precondiciones:** Sesión y permiso `RESERVATION_VIEW_OWN`.
- **Reglas:** `reservation.residentId` debe coincidir con el usuario; además se filtra por complejo.
- **Entidades:** `Reservation`, `User`, `CommonArea`, `PropertyUnit`.
- **Permisos / endpoints:** `RESERVATION_VIEW_OWN`; `GET /api/reservations/my`, `GET /api/reservations/:id`.
- **Dependencias:** HU-001, HU-004, HU-008; TK-BE-03, TK-FE-02.
- **Pruebas relacionadas:** Pendientes consulta propia y denegación de reserva ajena.
- **Evidencia:** filtros en `backend/src/app.ts`, vistas en `frontend/src/pages.tsx`.

**Criterios:** Given residente autenticado, when lista, then solo recibe reservas propias; Given ID ajeno/de otro complejo, when abre detalle, then no se expone y recibe `404`.

## HU-006 — Gestionar invitados

- **Actor:** Residente responsable.
- **Necesidad:** Registrar y consultar invitados de su reserva.
- **Beneficio:** Autorizar su acceso ante vigilancia.
- **Prioridad / Estado:** Must Have / Implementada; integración pendiente.
- **Alcance:** Crear y listar; eliminación futura propia está implementada como Should Have.
- **Fuera de alcance:** Registro general de visitantes, ingreso/salida y QR.
- **Precondiciones:** Reserva propia aprobada del complejo; permisos correspondientes.
- **Reglas:** Documento único dentro de la reserva; solo el propietario crea/elimina; vigilancia solo consulta.
- **Entidades:** `Guest`, `Reservation`, `User`.
- **Permisos / endpoints:** `GUEST_CREATE_OWN`, `GUEST_VIEW_OWN`, `GUEST_DELETE_OWN`; `POST/GET /api/reservations/:id/guests`, `DELETE .../:guestId`.
- **Dependencias:** HU-004, HU-005, HU-008; TK-BE-04, TK-FE-02.
- **Pruebas relacionadas:** Pendientes persistencia, duplicidad, recurso ajeno y vigilancia de solo lectura.
- **Evidencia:** `backend/prisma/schema.prisma`, `backend/src/app.ts`, `frontend/src/pages.tsx`.

**Criterios:** Given reserva aprobada propia, when agrega invitado válido, then persiste y responde `201`; Given reserva ajena, then no se expone; Given consulta propia, then devuelve sus invitados.

## HU-007 — Consultar reservas desde vigilancia

- **Actor:** Vigilancia.
- **Necesidad:** Consultar reservas aprobadas e invitados autorizados por fecha.
- **Beneficio:** Verificar acceso con datos del residente y unidad.
- **Prioridad / Estado:** Must Have / Implementada; E2E pendiente.
- **Alcance:** Lista por fecha, detalle e invitados, en modo lectura.
- **Fuera de alcance:** Crear, modificar, cancelar reservas/invitados o registrar entradas.
- **Precondiciones:** Rol SECURITY vigente y permisos de lectura.
- **Reglas:** Solo `APPROVED`, del complejo activo y que intersecten la fecha consultada; SECURITY carece de permisos de escritura.
- **Entidades:** `Reservation`, `Guest`, `CommonArea`, `PropertyUnit`, `User`.
- **Permisos / endpoints:** `RESERVATION_VIEW_APPROVED`, `GUEST_VIEW_AUTHORIZED`; `GET /api/security/reservations`, `GET /api/security/reservations/:id`, consulta de invitados.
- **Dependencias:** HU-001, HU-006, HU-008; TK-BE-05, TK-SEC-01, TK-FE-03.
- **Pruebas relacionadas:** Pendientes filtro por fecha/complejo y matriz negativa de escritura.
- **Evidencia:** `backend/src/app.ts`, matriz SECURITY en `backend/prisma/seed.ts`.

**Criterios:** Given vigilancia, when consulta fecha, then solo ve aprobadas del complejo; when abre detalle, then ve zona, unidad, residente e invitados; when intenta escribir, then recibe `403`.

## HU-008 — Aplicar permisos según rol y copropiedad

- **Actor:** Plataforma.
- **Necesidad:** Aplicar autorización persistida y alcance de datos.
- **Beneficio:** Evitar escalamiento de privilegios y acceso horizontal.
- **Prioridad / Estado:** Must Have / Implementada; matriz de integración pendiente.
- **Alcance:** ADMIN, SECURITY, RESIDENT; permisos atómicos, vigencia, complejo y propiedad. Consultas administrativas son Should Have dentro de esta infraestructura.
- **Fuera de alcance:** Diseñador UI de roles/permisos, superadministrador y acceso entre complejos.
- **Precondiciones:** JWT válido, usuario/complejo activos y asignación vigente.
- **Reglas:** Fuente real en BD; `startDate/endDate` aplican; `complexId` viene del token; recursos propios validan propietario.
- **Entidades:** `Role`, `Permission`, `RolePermission`, `UserRole`, `ResidentialComplex`, `User`.
- **Permisos / endpoints:** Toda la matriz del seed; middleware sobre `/api`; rutas `/api/admin/*` son Should Have.
- **Dependencias:** TK-DB-01, TK-SEC-01, TK-TEST-02.
- **Pruebas relacionadas:** Vigencia en `backend/tests/unit/security.test.ts`; faltan permiso, complejo, propiedad y multi-copropiedad de integración.
- **Evidencia:** `backend/src/security.ts`, `backend/src/app.ts`, `backend/prisma/seed.ts`.

**Criterios:** Given permiso ausente, then `403`; Given rol vencido, then pierde acceso; Given recurso de otro complejo, then no se expone; Given residente y recurso ajeno, then no se expone.

## Brechas honestas

- No existe `backend/prisma/migrations` ni `backend/tests/integration`.
- Las pruebas unitarias actuales no cubren toda la matriz obligatoria.
- Existe `e2e/resident-flow.spec.ts`, pero esta auditoría no acredita una ejecución exitosa.
