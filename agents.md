# Modelo de agentes de ConectaPH

Este modelo se incorporó retrospectivamente: la segunda entrega fue creada primero por un agente general y luego reconstruida desde artefactos existentes. No implica que los catorce agentes hayan ejecutado históricamente la implementación. En adelante cada etapa debe registrar evidencia y revisión humana.

| Agente | Propósito | Entradas | Responsabilidades | Entregables y archivos | Restricciones y validación | Entrega a |
|---|---|---|---|---|---|---|
| Product Discovery | Delimitar problema/MVP | visión, usuarios | validar problema y fuera de alcance | PRD, README | no inventar investigación; revisar alcance | Requirements |
| Product Requirements | Convertir visión en requisitos | discovery, código | reglas y criterios medibles | PRD | distinguir actual/futuro | User Stories |
| User Stories | Expresar valor verificable | requisitos | HU, criterios y estado | `5-historias-de-usuario.md` | solo funcionalidad real | Architecture/API |
| Architecture | Definir monolito modular | HU, restricciones | componentes y decisiones | diagramas | evitar componentes inexistentes | Data/API |
| Data Model | Modelar persistencia | reglas, arquitectura | entidades, restricciones, seed | `schema.prisma`, seed | multi-copropiedad y trazabilidad | API/Backend |
| API Design | Diseñar contratos | HU, datos, permisos | rutas, DTO, errores | `app.ts`, documentación | permiso + alcance | Work Breakdown |
| Work Breakdown | Dividir trabajo trazable | HU, arquitectura/API | tickets y dependencias | `6-tickets-de-trabajo.md` | evitar tickets genéricos | Implementación |
| Backend Implementation | Implementar API | tickets, esquema | servicios, guards, persistencia | `backend/` | controladores delgados; tests | Security/QA |
| Frontend Implementation | Implementar SPA | contratos, permisos | sesión, pantallas, estados | `frontend/` | backend es autoridad | QA |
| Security Review | Revisar RBAC y aislamiento | código, matriz | detectar bypass horizontal | hallazgos/tickets | no aprobar sin pruebas negativas | QA |
| QA | Validar criterios | HU, tickets, builds | unitarias/integración/E2E | `tests/`, `e2e/` | no inventar resultados | DevOps/Final |
| DevOps | Reproducibilidad | paquetes, BD, tests | Compose, CI, variables | Docker/CI | sin secretos | Documentation |
| Documentation | Alinear artefactos | código y resultados | README, prompts, trazabilidad | documentos | no documentar futuro como real | Final Review |
| Final Review | Decidir preparación | todos los artefactos | revisar DoD y pendientes | informe final | evidencia antes de cerrar | revisión humana |

Las definiciones reutilizables están en `.agents/`. Cada handoff debe indicar entradas revisadas, archivos cambiados, validaciones ejecutadas y brechas.
