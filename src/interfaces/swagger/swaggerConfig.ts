import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuarios',
      version: '1.0.0',
      description: 'API para gestión de usuarios con arquitectura DDD',
      contact: {
        name: 'Soporte Técnico',
        email: 'molinaguzman.ing@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Servidor local',
      },
      {
        url: 'http://localhost:8080/api',
        description: 'Servidor local con prefijo API',
      },
    ],
    components: {
      schemas: {
        Direccion: {
          type: 'object',
          properties: {
            calle: { 
              type: 'string', 
              example: 'Av. Siempre Viva 123',
              description: 'Nombre de la calle y número'
            },
            ciudad: { 
              type: 'string', 
              example: 'Lima',
              description: 'Nombre de la ciudad'
            },
            pais: { 
              type: 'string', 
              example: 'Perú',
              description: 'Nombre del país'
            },
            codigo_postal: { 
              type: 'string', 
              example: '15001',
              description: 'Código postal'
            },
          },
          required: ['calle', 'ciudad', 'pais', 'codigo_postal'],
        },
        
        Usuario: {
          type: 'object',
          properties: {
            id: { 
              type: 'string', 
              example: '507f1f77bcf86cd799439011',
              description: 'ID único del usuario (MongoDB ObjectId)'
            },
            nombre: { 
              type: 'string', 
              example: 'Juan Pérez',
              description: 'Nombre completo del usuario'
            },
            email: { 
              type: 'string', 
              example: 'juan@example.com',
              description: 'Email único del usuario'
            },
            edad: { 
              type: 'number', 
              example: 30,
              description: 'Edad del usuario (opcional)',
              minimum: 0,
              maximum: 150
            },
            fecha_creacion: { 
              type: 'string', 
              format: 'date-time',
              description: 'Fecha de creación del registro'
            },
            direcciones: { 
              type: 'array', 
              items: { $ref: '#/components/schemas/Direccion' },
              description: 'Lista de direcciones del usuario'
            },
          },
        },
        
        CreateUsuarioRequest: {
          type: 'object',
          properties: {
            nombre: { 
              type: 'string', 
              example: 'Juan Pérez',
              minLength: 2,
              maxLength: 100
            },
            email: { 
              type: 'string', 
              example: 'juan@example.com',
              format: 'email'
            },
            edad: { 
              type: 'number', 
              example: 30,
              minimum: 0,
              maximum: 150
            },
            direcciones: { 
              type: 'array', 
              items: { $ref: '#/components/schemas/Direccion' },
              default: []
            },
          },
          required: ['nombre', 'email'],
        },
        
        UpdateUsuarioRequest: {
          type: 'object',
          properties: {
            nombre: { 
              type: 'string', 
              example: 'Juan Pérez Actualizado',
              minLength: 2,
              maxLength: 100
            },
            email: { 
              type: 'string', 
              example: 'juan.actualizado@example.com',
              format: 'email'
            },
            edad: { 
              type: 'number', 
              example: 31,
              minimum: 0,
              maximum: 150
            },
            direcciones: { 
              type: 'array', 
              items: { $ref: '#/components/schemas/Direccion' }
            },
          },
        },
        
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { 
              type: 'boolean', 
              example: true,
              description: 'Indica si la operación fue exitosa'
            },
            data: { 
              type: 'object',
              description: 'Datos de respuesta',
              nullable: true
            },
            message: { 
              type: 'string', 
              example: 'Operación exitosa',
              description: 'Mensaje descriptivo'
            },
            statusCode: { 
              type: 'number', 
              example: 200,
              description: 'Código de estado HTTP'
            },
          },
        },
        
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { 
              type: 'boolean', 
              example: false,
              description: 'Indica si la operación fue exitosa'
            },
            error: { 
              type: 'string',
              description: 'Mensaje de error principal'
            },
            statusCode: { 
              type: 'number',
              description: 'Código de estado HTTP',
              example: 400
            },
            details: { 
              type: 'array', 
              items: { type: 'string' },
              description: 'Detalles adicionales del error',
              nullable: true
            },
          },
        },
        
        PaginationMetadata: {
          type: 'object',
          properties: {
            total: { 
              type: 'number', 
              example: 50,
              description: 'Total de registros'
            },
            page: { 
              type: 'number', 
              example: 1,
              description: 'Página actual'
            },
            limit: { 
              type: 'number', 
              example: 10,
              description: 'Límite de registros por página'
            },
            totalPages: { 
              type: 'number', 
              example: 5,
              description: 'Total de páginas'
            },
          },
        },
        
        PaginatedResponse: {
          type: 'object',
          properties: {
            success: { 
              type: 'boolean', 
              example: true
            },
            data: { 
              type: 'array',
              items: { $ref: '#/components/schemas/Usuario' },
              description: 'Lista de usuarios paginada'
            },
            message: { 
              type: 'string', 
              example: 'Operación exitosa'
            },
            statusCode: { 
              type: 'number', 
              example: 200
            },
            pagination: {
              $ref: '#/components/schemas/PaginationMetadata'
            },
          },
        },
        
        UsuarioListResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            data: {
              type: 'array',
              items: { $ref: '#/components/schemas/Usuario' }
            },
            pagination: {
              $ref: '#/components/schemas/PaginationMetadata'
            }
          }
        }
      },
    },
    tags: [
      {
        name: 'Usuarios',
        description: 'Operaciones relacionadas con usuarios',
      },
      {
        name: 'Health',
        description: 'Endpoints de verificación de salud',
      },
    ],
  },
  apis: ['./src/interfaces/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi };