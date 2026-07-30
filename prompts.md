# Prompts y uso de IA

Este registro distingue evidencia histórica de reconstrucción. Los prompts de
producto, PRD, arquitectura, datos, API, historias y tickets provienen del
archivo original. Cuando no se conservó el texto exacto, se marca expresamente
como **reconstrucción fiel**; no representa una conversación literal.

La segunda entrega fue creada inicialmente por un agente general de Codex. El
modelo de catorce agentes se incorporó después para organizar la auditoría de
artefactos existentes; no se afirma que esos agentes ejecutaran históricamente
la implementación.

## 1. Descubrimiento de producto

### Prompt 1

**Objetivo**  
Definir problema, valor, usuarios y recorrido del MVP.

**Herramienta**  
Asistente de IA (herramienta exacta no conservada).

**Prompt**  
“Actúa como experto en producto digital para propiedad horizontal. Define las
funcionalidades prioritarias, beneficios, alternativas manuales y recorridos del
residente y vigilancia para ConectaPH, limitado a reservas de zonas comunes.”

**Resultado generado**  
Propuesta amplia de plataforma y priorización inicial.

**Ajustes humanos**  
Diego eligió el nombre ConectaPH y limitó el MVP al módulo de reservas.

**Decisión final**  
Resolver reservas e invitados; excluir PQRS, cartera y demás módulos.

**Artefactos relacionados**

- `ConectaPH-PRD.md`
- `README.md`

## 2. PRD y alcance

### Prompt 1

**Objetivo**  
Crear requisitos medibles.

**Herramienta**  
Asistente de IA (herramienta exacta no conservada).

**Prompt**  
“Actúa como Product Manager senior y genera un PRD para residentes,
administración y vigilancia, con problema, objetivos, historias, requisitos y
criterios de éxito.”

**Resultado generado**  
PRD inicial con ideas de alcance futuro.

**Ajustes humanos**  
Se separó el MVP real del roadmap y se definió aprobación automática cuando no
hay concurrencia.

**Decisión final**  
El flujo principal termina en reserva `APPROVED`; no usa aprobación manual.

**Artefactos relacionados**

- `ConectaPH-PRD.md`
- HU-01 a HU-06

## 3. Historias de usuario

### Prompt 1

**Objetivo**  
Expresar el valor como criterios verificables.

**Herramienta**  
Asistente de IA y revisión posterior con Codex.

**Prompt**  
“Documenta las historias principales del desarrollo con buenas prácticas.”

**Resultado generado**  
Historias de residente, vigilancia y administración.

**Ajustes humanos**  
Se vinculó el registro de invitados a una reserva propia y la consulta de
vigilancia se restringió a solo lectura.

**Decisión final**  
Mantener únicamente historias respaldadas por rutas y pruebas.

**Artefactos relacionados**

- `5-historias-de-usuario.md`
- `trazabilidad.md`

## 4. Tickets de trabajo

### Prompt 1

**Objetivo**  
Desglosar historias en trabajo técnico.

**Herramienta**  
Asistente de IA y revisión posterior con Codex.

**Prompt**  
“Documenta tickets de backend, frontend y datos con detalle suficiente para
desarrollarlos de inicio a fin.”

**Resultado generado**  
Tickets técnicos iniciales.

**Ajustes humanos**  
Se añadieron dependencias, evidencia y estados basados en el repositorio.

**Decisión final**  
No cerrar tickets de integración, E2E o despliegue sin ejecución real.

**Artefactos relacionados**

- `6-tickets-de-trabajo.md`
- `trazabilidad.md`

## 5. Arquitectura

### Prompt 1

**Objetivo**  
Representar componentes y relaciones.

**Herramienta**  
Asistente de IA (prompt original conservado parcialmente).

**Prompt**  
“De acuerdo con ConectaPH, genera un diagrama C4.”

**Resultado generado**  
Diagramas y propuestas que incluyeron microservicios.

**Ajustes humanos**  
Se descartó la arquitectura de microservicios por no corresponder al código.

**Decisión final**  
Monolito modular con SPA, API y PostgreSQL.

**Artefactos relacionados**

- `ConectaPH-C4-Diagrams.md`
- `C4Context.mmd`
- `C4Container.mmd`

## 6. Modelo de datos

### Prompt 1

**Objetivo**  
Modelar copropiedad, unidades, usuarios y reservas.

**Herramienta**  
Asistente de IA y Codex.

**Prompt**  
“Propón entidades, campos y relaciones para un sistema de reservas de
copropiedad.” La evolución detallada es una **reconstrucción fiel**.

**Resultado generado**  
Modelo inicial con residente, usuario, recurso y reserva.

**Ajustes humanos**  
Diego eliminó `tower` como campo fijo; creó `UnitType`, `UnitGroupType`,
`UnitGroup` y `UserPropertyUnit`; descartó agrupaciones jerárquicas.

**Decisión final**  
La agrupación es opcional y la reserva conserva residente y unidad responsable.

**Artefactos relacionados**

- `backend/prisma/schema.prisma`
- Ticket DATA

## 7. API

### Prompt 1

**Objetivo**  
Definir contratos HTTP del flujo.

**Herramienta**  
Asistente de IA y Codex.

**Prompt**  
“Describe endpoints principales y ejemplos de petición/respuesta.” La
adaptación al monolito es una **reconstrucción fiel**.

**Resultado generado**  
Propuesta OpenAPI parcial basada inicialmente en microservicios.

**Ajustes humanos**  
Se eliminó `complexId` controlable del flujo normal y se normalizaron errores
`401`, `403`, `409` y `422`.

**Decisión final**  
Express deriva copropiedad del JWT y valida propiedad del recurso.

**Artefactos relacionados**

- `backend/src/app.ts`
- HU-01 a HU-06

## 8. Backend

### Prompt 1

**Objetivo**  
Construir API, persistencia y reglas.

**Herramienta**  
Codex, agente general.

**Prompt**  
**Reconstrucción fiel:** “Implementa el MVP de reservas con Express, Prisma,
PostgreSQL, aprobación automática, concurrencia, invitados, RBAC y seed.”

**Resultado generado**  
API, servicios de reserva, esquema y datos de demostración.

**Ajustes humanos**  
Se mantuvo el alcance de reservas y se exigió relación activa
`UserPropertyUnit`.

**Decisión final**  
Controladores delgados y reglas críticas en backend.

**Artefactos relacionados**

- `backend/src/`
- `backend/prisma/seed.ts`

## 9. Frontend

### Prompt 1

**Objetivo**  
Crear una SPA conectada a la API.

**Herramienta**  
Codex, agente general.

**Prompt**  
**Reconstrucción fiel:** “Implementa login, zonas, reserva, invitados,
vigilancia y administración en React, adaptando rutas a permisos.”

**Resultado generado**  
SPA React y cliente HTTP.

**Ajustes humanos**  
Se aclaró que ocultar navegación no autoriza operaciones.

**Decisión final**  
El backend sigue siendo la autoridad; vigilancia solo consulta.

**Artefactos relacionados**

- `frontend/src/`
- `e2e/resident-flow.spec.ts`

## 10. Seguridad y RBAC

### Prompt 1

**Objetivo**  
Evitar bypass de permisos y copropiedad.

**Herramienta**  
Codex.

**Prompt**  
**Reconstrucción fiel:** “Revisa RBAC persistido, vigencia, alcance por
copropiedad, acceso horizontal y separación entre frontend y backend.”

**Resultado generado**  
Modelo `User`, `Role`, `Permission`, `UserRole` y `RolePermission`.

**Ajustes humanos**  
Diego decidió no usar un rol fijo en `User`; los roles se asignan por
copropiedad y los permisos se comprueban en backend.

**Decisión final**  
JWT con copropiedad, recarga de asignaciones vigentes y filtros por recurso.

**Artefactos relacionados**

- `backend/src/security.ts`
- `backend/tests/unit/security.test.ts`

## 11. Pruebas

### Prompt 1

**Objetivo**  
Comprobar reglas, API y flujo real.

**Herramienta**  
Codex.

**Prompt**  
**Reconstrucción fiel:** “Audita unitarias, agrega integración con PostgreSQL y
un E2E Playwright determinista para reserva e invitado.”

**Resultado generado**  
Unitarias, pruebas UI, suite de integración y E2E.

**Ajustes humanos**  
Se prohibieron mocks como sustituto del backend y se registró como no ejecutado
lo bloqueado por Docker.

**Decisión final**  
No afirmar que integración/E2E pasan hasta ejecutarlos en un entorno con BD.

**Artefactos relacionados**

- `backend/tests/`
- `frontend/src/test/`
- `e2e/`
- `TESTING.md`

## 12. CI/CD

### Prompt 1

**Objetivo**  
Hacer reproducible la validación.

**Herramienta**  
Codex.

**Prompt**  
**Reconstrucción fiel:** “Corrige GitHub Actions para instalar, generar Prisma,
preparar PostgreSQL, ejecutar typecheck, pruebas y build.”

**Resultado generado**  
Workflow con servicio PostgreSQL.

**Ajustes humanos**  
Después de errores de Prisma en CI se ubicó explícitamente `db:generate` antes
del typecheck y se evitó un lint raíz no fiable.

**Decisión final**  
CI valida calidad; no despliega ni ejecuta Playwright.

**Artefactos relacionados**

- `.github/workflows/ci.yml`
- `package.json`

## 13. Despliegue

### Prompt 1

**Objetivo**  
Documentar una publicación segura.

**Herramienta**  
Codex.

**Prompt**  
**Reconstrucción fiel:** “Documenta frontend, API, PostgreSQL, secretos, CORS,
health check, comandos, fallos y rollback sin inventar URLs.”

**Resultado generado**  
Guía agnóstica de proveedor.

**Ajustes humanos**  
No se declaró despliegue ni CI/CD automático sin evidencia.

**Decisión final**  
Publicación y URL quedan pendientes de ejecución humana.

**Artefactos relacionados**

- `DEPLOYMENT.md`
- `docs/evidencias/README.md`

## 14. Revisión final

### Prompt 1

**Objetivo**  
Cerrar la entrega sobre evidencia real.

**Herramienta**  
Codex.

**Prompt**  
El prompt de cierre del 29 de julio de 2026 solicitó auditar rama, flujo, RBAC,
pruebas, CI, documentación, evidencias y release, sin push ni tag.

**Resultado generado**  
Correcciones acotadas, documentación final y registro de validaciones.

**Ajustes humanos**  
Diego exige distinguir propuestas de IA del resultado final y conservar revisión
humana en cada handoff.

**Decisión final**  
Preparar `v1.0-final-DZC` sin crear tag, push, PR ni release remoto.

**Artefactos relacionados**

- `README.md`
- `RELEASE.md`
- `agents.md`
- `.agents/`
