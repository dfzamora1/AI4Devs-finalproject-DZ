> Detalla en esta sección los prompts principales utilizados durante la creación del proyecto, que justifiquen el uso de asistentes de código en todas las fases del ciclo de vida del desarrollo. Esperamos un máximo de 3 por sección, principalmente los de creación inicial o  los de corrección o adición de funcionalidades que consideres más relevantes.
Puedes añadir adicionalmente la conversación completa como link o archivo adjunto si así lo consideras


## Índice

1. [Descripción general del producto](#1-descripción-general-del-producto)
2. [Arquitectura del sistema](#2-arquitectura-del-sistema)
3. [Modelo de datos](#3-modelo-de-datos)
4. [Especificación de la API](#4-especificación-de-la-api)
5. [Historias de usuario](#5-historias-de-usuario)
6. [Tickets de trabajo](#6-tickets-de-trabajo)
7. [Pull requests](#7-pull-requests)

---

## 1. Descripción general del producto

**Prompt 1:**
Actua como un experto en producto digital, con experiencia en plataformas de propiedad horizontal. Estoy diseñando una producto llamando ConectaPH, una plataforma web para conectar residentes, administración y vigilancia en la copropiedad. La aplicación contará con varios modulos, pero vamos a trabajar un MVP de gestión de reservas de zonas comunes.

Necesito que me ayudes a definir:

- ¿Qué funcionalidades básicas debe tener este MVP?
- Ordénalas de mayor a menor prioridad.
- ¿Qué beneficios obtiene la copropiedad al usar ConectaPH?
- ¿Qué alternativas manuales existen actualmente y cuáles son sus problemas?
- ¿Cómo sería el customer journey de un residente que reserva una zona común?
- ¿Cómo sería el customer journey de vigilancia al consultar los invitados autorizados?

Actualiza esta información en el archivo readme.md
**Prompt 2:**
Actúa como un Product Manager senior. Necesito un PRD para ConectaPH. El público objetivo son todos los residentes, personal de vigilancia y administración de un conjunto residencial que quieren reservar o hacer el seguimiento de las reservas y personas autorizadas. Genera un PRD completo incluyendo: problema a resolver, objetivos medibles, user stories principales, requisitos funcionales y no funcionales, y criterios de éxito. Agrega el resultado en una archivo [ConectaPH-PRD.md] en formato markdown
**Prompt 3:**
Eres un analista de software experto. Estoy construyendo un sistema de reservas para una copropiedad. Enumera y describe brevemente los casos de uso más importantes a implementar para lograr una funcionalidad básica. Agregalo en el archivo PRD completo ConectaPH-DZ.md al final.
---

## 2. Arquitectura del Sistema

### **2.1. Diagrama de arquitectura:**

**Prompt 1:**
Eres un brillante arquitecto de software. Eres capaz de diseñar, explicar y diagramar los diferentes aspectos de un sistema de software.
Estoy construyendo un sistema de gestión de reservas para una copropiedad. He definido las entidades Residentes, usuarios, Recursos (Zonas comunes), accesos, reservas.
Qué otras entidades del modelo de datos son importantes en un sistema? Dame los campos más importantes de cada una y cómo se relacionan entre entidades.
(Código diagrama mermaid)

**Prompt 2:**
Agrega la arquitectura al final del archivo ConectaPH-PRD.md y actualiza el archivo readme.md en la sección Arquitectura del sistema.
**Prompt 3:**

### **2.2. Descripción de componentes principales:**

**Prompt 1:**
De acuerdo a lo que se ha estructurado del proyecto de aplicación ConectaPH, genera un diagrama de C4.
**Prompt 2:**

**Prompt 3:**

### **2.3. Descripción de alto nivel del proyecto y estructura de ficheros**

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**

### **2.4. Infraestructura y despliegue**

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**

### **2.5. Seguridad**

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**

### **2.6. Tests**

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**

---

### 3. Modelo de Datos

**Prompt 1:**
Eres un brillante arquitecto de software. Eres capaz de diseñar, explicar y diagramar los diferentes aspectos de un sistema de software. Estoy construyendo un sistema de gestión de reservas para una copropiedad. He definido las entidades Residentes, usuarios, Recursos (Zonas comunes), accesos, reservas. Qué otras entidades del modelo de datos son importantes en un sistema? Dame los campos más importantes de cada una y cómo se relacionan entre entidades. (Código diagrama mermaid).

**Prompt 2:**
Agrega la arquitectura al final del archivo ConectaPH-PRD.md y actualiza el archivo readme.md en la sección Arquitectura del sistema.

**Prompt 3:**

---

### 4. Especificación de la API

**Prompt 1:**
Eres un brillante arquitecto de software. Eres capaz de diseñar, explicar y diagramar los diferentes aspectos de un sistema de software. Estoy construyendo un sistema de gestión de reservas para una copropiedad. He definido las entidades Residentes, usuarios, Recursos (Zonas comunes), accesos, reservas.

Qué otras entidades del modelo de datos son importantes en un sistema? Dame los campos más importantes de cada una y cómo se relacionan entre entidades. (Código diagrama mermaid)

Agrega la arquitectura al final del archivo ConectaPH-PRD.md y actualiza el archivo readme.md en la sección Arquitectura del sistema.

**Prompt 2:**
Arquitectura de microservicios para un sistema de reserva de recursos, dónde todos los MS apuntan a la misma bd. El frontend se comunica a través del API. Todo alojado en contenedores on premise. Incluye los servicios necesarios. La base de datos es relacional en postgres. 

Describe los endpoints principales (máximo 3) en formato OpenAPI. Opcionalmente puedes añadir un ejemplo de petición y de respuesta para mayor claridad.

Actualiza en el readme.md en el aparte de Especificación de la API.

**Prompt 3:**
De acuerdo a lo que se ha estructurado del proyecto de aplicación ConectaPH, genera un diagrama de C4.

---

### 5. Historias de Usuario

**Prompt 1:**
Documenta 3 de las historias de usuario principales utilizadas durante el desarrollo, teniendo en cuenta las buenas prácticas de producto al respecto. Actualiza En el archivo readme.md en el numeral 5 historias de usuario. 

**Prompt 2:**

**Prompt 3:**

---

### 6. Tickets de Trabajo

**Prompt 1:**
Documenta 3 de los tickets de trabajo principales del desarrollo, uno de backend, uno de frontend, y uno de bases de datos. Da todo el detalle requerido para desarrollar la tarea de inicio a fin teniendo en cuenta las buenas prácticas al respecto. Actualiza el readme.md
**Prompt 2:**

**Prompt 3:**

---

### 7. Pull Requests

## 8. Evolución de la segunda entrega y organización por agentes

### Contexto

La segunda entrega fue generada inicialmente por un agente general a partir de un prompt amplio de construcción del MVP de reservas. Después, por decisión humana, el proceso se reconstruyó retrospectivamente como etapas especializadas. No se reinició el proyecto ni se crearon aplicaciones paralelas: los agentes revisan y alinean los artefactos existentes con el código.

### Prompt inicial de la segunda entrega

- **Objetivo:** construir el flujo residente → zona → disponibilidad → reserva aprobada → invitados → consulta de vigilancia, conectado a PostgreSQL.
- **Herramienta:** Codex, agente general de desarrollo.
- **Prompt:** instrucción de construcción de la segunda entrega funcional de ConectaPH, incluyendo RBAC persistido, alcance por copropiedad, frontend, backend, Prisma, seed, pruebas y documentación.
- **Resultado:** se crearon los workspaces `backend` y `frontend`, esquema Prisma, API Express, SPA React, Docker Compose, seed y pruebas iniciales.
- **Ajustes humanos:** limitar el MVP a reservas; exigir aprobación automática; vigilancia de solo lectura; mantener trazabilidad histórica de residente y unidad; documentar como pendiente aquello que no tenga validación ejecutada.
- **Decisión final:** conservar la implementación y someterla a revisión especializada, sin reconstruirla desde cero.

### Decisiones humanas de producto y datos

1. ConectaPH permanece como producto general de propiedad horizontal, pero el MVP se limita a reservas.
2. Las reservas sin concurrencia se aprueban automáticamente; no se usa `PENDING` en el flujo principal.
3. Se eliminó el concepto rígido `tower`: las unidades usan `UnitType`, `UnitGroupType` y `UnitGroup`.
4. Las agrupaciones no son jerárquicas; `unitGroupId` es opcional para soportar casas, locales y parqueaderos.
5. `UserPropertyUnit` permite varias relaciones persona–unidad y define una unidad principal vigente.
6. La reserva guarda `residentId` y `propertyUnitId` para trazabilidad histórica.
7. `User` no contiene un rol fijo. `UserRole`, `RolePermission` y `Permission` forman un RBAC persistido y con alcance por copropiedad.
8. Vigilancia es solo lectura y la seguridad efectiva se valida en backend; el frontend únicamente orienta la navegación.
9. La interfaz avanzada para diseñar roles y permisos queda fuera del MVP.

### Incorporación retrospectiva del modelo de agentes

- **Objetivo:** hacer explícitas las etapas de producto, requisitos, historias, arquitectura, datos, API, desglose, implementación, seguridad, QA, DevOps, documentación y revisión final.
- **Herramienta:** Codex con agentes especializados para auditoría y generación documental.
- **Resultado:** `agents.md` y `.agents/` definen responsabilidades y handoffs reutilizables. Las etapas anteriores se describen como reconstruidas a partir de artefactos; no se afirma una ejecución histórica que no pueda demostrarse.
- **Ajustes humanos:** separar evidencia estática de validación ejecutada y prohibir que una etapa marque como terminada una salida sin pruebas.
- **Decisión final:** adoptar los catorce agentes como proceso para ajustes posteriores y entrega final.

### Historias, tickets y trazabilidad

- **Objetivo:** relacionar necesidades, criterios, trabajo técnico, código y pruebas reales.
- **Resultado:** se crearon `5-historias-de-usuario.md`, `6-tickets-de-trabajo.md` y `trazabilidad.md`.
- **Revisión humana:** los estados se ajustaron para distinguir “implementado en código”, “validación parcial” y “pendiente”; la presencia de un archivo E2E no equivale a una ejecución satisfactoria.

### Correcciones posteriores a la revisión de IA

La revisión detectó documentación heredada de microservicios, notificaciones y aprobación manual que no corresponde al monolito modular actual; ausencia de migración versionada y pruebas de integración; selectores E2E desalineados; contratos frontend/backend inconsistentes para invitados y unidades; guards atómicos faltantes en algunas lecturas; y scripts de lint incompletos. Estas brechas se registran como tickets o pendientes y no se presentan como funcionalidades verificadas.

**Prompt 1:**

**Prompt 2:**

**Prompt 3:**
