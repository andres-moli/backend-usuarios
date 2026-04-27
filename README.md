````md
# API de Usuarios - Backend CRUD

Backend para gestión de usuarios implementado con Node.js (express), TypeScript y MongoDB, siguiendo principios de Domain-Driven Design (DDD) y buenas prácticas de ingeniería de software.

---

## Características Técnicas

- Arquitectura DDD: Separación clara entre Domain, Application, Infrastructure e Interfaces
- TypeScript: Tipado estático estricto y uso de interfaces
- MongoDB + Mongoose: Con índices optimizados para email y ciudad
- Caché en memoria: Implementado con node-cache y abstraído mediante interfaz
- Repository Pattern: Abstracción de la capa de datos
- Validaciones robustas: Zod para validación de datos
- Manejo de errores centralizado: Excepciones custom
- Rate Limiting: Protección contra ataques de fuerza bruta
- Swagger: Documentación de API
- Docker Ready: Contenedores para app y MongoDB

---

## Requisitos Previos

- Node.js 20+
- Docker y Docker Compose (opcional)
- MongoDB 7+ (si no usas Docker)

---

## Instalación y Ejecución

### Con Docker

```bash
git clone https://github.com/andresmolina/prueba_backend.git
cd prueba_backend

cp .env.example .env

docker-compose up --build
````

API:

* [http://localhost:3000](http://localhost:3000)
* [http://localhost:3000/docs](http://localhost:3000/docs)

---

### Sin Docker

```bash
npm install

cp .env.example .env

npm run dev
```

---

## Endpoints API

| Método | Endpoint                         | Descripción        |
| ------ | -------------------------------- | ------------------ |
| POST   | /api/usuarios                    | Crear usuario      |
| GET    | /api/usuarios                    | Listar usuarios    |
| GET    | /api/usuarios/:id                | Obtener usuario    |
| PUT    | /api/usuarios/:id                | Actualizar usuario |
| DELETE | /api/usuarios/:id                | Eliminar usuario   |
| GET    | /api/usuarios/buscar?ciudad=Lima | Buscar por ciudad  |

---

## Modelo de Usuario

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "edad": 30,
  "direcciones": [
    {
      "calle": "Av. Siempre Viva 123",
      "ciudad": "Lima",
      "pais": "Perú",
      "codigo_postal": "15001"
    }
  ]
}
```

---

## Índices de MongoDB

* email: índice único
* direcciones.ciudad: índice para búsquedas

---

## Rate Limiting

* Ventana: 15 minutos
* Máximo: 100 peticiones por IP

---

## Caché en Memoria

* TTL: 300 segundos
* Endpoints cacheados:

  * GET /usuarios
  * GET /usuarios/:id
  * GET /usuarios/buscar
* Invalidación automática en escrituras

---

## Decisiones Técnicas

### DDD

Separación clara de responsabilidades y escalabilidad.

### Repository Pattern

Desacopla la lógica de persistencia.

### Caché en memoria

Suficiente para el proyecto, migrable a Redis.

### Zod

Validación con tipado inferido en TypeScript.

### Mongoose

Balance entre flexibilidad y productividad.

---

## Swagger

[http://localhost:3000/docs](http://localhost:3000/docs)

---

## Respuestas

### Éxito

```json
{
  "success": true,
  "data": {},
  "message": "Operación exitosa",
  "statusCode": 200
}
```

### Error

```json
{
  "success": false,
  "error": "Mensaje de error",
  "statusCode": 400,
  "details": []
}
```

### Paginación

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "total": 0,
    "page": 1,
    "limit": 10,
    "totalPages": 0
  }
}
```

---

## Scripts

* npm run dev: Desarrollo
* npm run build: Compilar TypeScript
* npm start: Producción
* npm run clean: Limpiar build

---

## Estructura del Proyecto

```
src/
├── domain/
├── application/
├── infrastructure/
├── interfaces/
├── shared/
└── config/
```

---

## Variables de Entorno

| Variable                | Descripción | Default                                  |
| ----------------------- | ----------- | ---------------------------------------- |
| PORT                    | Puerto      | 3000                                     |
| NODE_ENV                | Entorno     | development                              |
| MONGODB_URI             | MongoDB     | mongodb://localhost:27017/prueba_backend |
| CACHE_TTL               | Cache       | 300                                      |
| RATE_LIMIT_MAX_REQUESTS | Rate limit  | 100                                      |

```

---
```
