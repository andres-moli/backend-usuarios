import { Request, Response, NextFunction } from 'express';
import { UsuarioService } from '../../application/services/UsuarioService';
import { CreateUsuarioDTO } from '../../application/dtos/CreateUsuarioDTO';
import { UpdateUsuarioDTO } from '../../application/dtos/UpdateUsuarioDTO';
import { formatSuccess, formatPaginated } from '../../shared/utils/responseFormatter';

/**
 * Controlador de Usuario
 * Maneja las peticiones HTTP relacionadas con usuarios
 * Aplica principios de responsabilidad única y separación de capas
 * 
 * @class UsuarioController
 */
export class UsuarioController {
  /**
   * Constructor del controlador
   * @param usuarioService - Servicio de usuario inyectado
   */
  constructor(private usuarioService: UsuarioService) {}
  
  /**
   * Crea un nuevo usuario
   * @route POST /api/usuarios
   * @param req - Request object
   * @param res - Response object
   * @param next - Next function for error handling
   * 
   * @example Request body:
   * {
   *   "nombre": "Juan Pérez",
   *   "email": "juan@example.com",
   *   "edad": 30,
   *   "direcciones": [{
   *     "calle": "Av. Principal 123",
   *     "ciudad": "Lima",
   *     "pais": "Perú",
   *     "codigo_postal": "15001"
   *   }]
   * }
   * 
   * @response 201 - Usuario creado exitosamente
   * @response 400 - Error de validación
   * @response 409 - Email duplicado
   */
  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.usuarioService.create(req.body);
      formatSuccess(res, result, 'Usuario creado exitosamente', 201);
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * Obtiene un usuario por su ID
   * @route GET /api/usuarios/:id
   * @param req - Request object con params.id
   * @param res - Response object
   * @param next - Next function
   * 
   * @param id - ID de MongoDB del usuario
   * 
   * @response 200 - Usuario encontrado
   * @response 404 - Usuario no encontrado
   * @response 400 - ID inválido
   */
  findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.usuarioService.findById(req.params.id);
      formatSuccess(res, result);
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * Obtiene lista paginada de usuarios
   * @route GET /api/usuarios
   * @param req - Request object con query params page y limit
   * @param res - Response object
   * @param next - Next function
   * 
   * @queryParam page - Número de página (default: 1)
   * @queryParam limit - Elementos por página (default: 10, max: 100)
   * 
   * @example Request: GET /api/usuarios?page=2&limit=20
   * 
   * @response 200 - Lista de usuarios con metadata de paginación
   * @response 400 - Parámetros inválidos
   */
  findAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      const result = await this.usuarioService.findAll(page, limit);
      formatPaginated(res, result.data, result.total, result.page, result.limit, result.totalPages);
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * Actualiza un usuario existente
   * @route PUT /api/usuarios/:id
   * @param req - Request object con params.id y body
   * @param res - Response object
   * @param next - Next function
   * 
   * @param id - ID del usuario a actualizar
   * 
   * @example Request: PUT /api/usuarios/507f1f77bcf86cd799439011
   * Body:
   * {
   *   "nombre": "Juan Pérez Actualizado",
   *   "edad": 31,
   *   "direcciones": [{
   *     "calle": "Nueva Calle 456",
   *     "ciudad": "Buenos Aires",
   *     "pais": "Argentina",
   *     "codigo_postal": "1000"
   *   }]
   * }
   * 
   * @response 200 - Usuario actualizado exitosamente
   * @response 404 - Usuario no encontrado
   * @response 400 - Error de validación
   * @response 409 - Email duplicado
   */
  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.usuarioService.update(req.params.id, req.body);
      formatSuccess(res, result, 'Usuario actualizado exitosamente');
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * Elimina un usuario
   * @route DELETE /api/usuarios/:id
   * @param req - Request object con params.id
   * @param res - Response object
   * @param next - Next function
   * 
   * @param id - ID del usuario a eliminar
   * 
   * @example Request: DELETE /api/usuarios/507f1f77bcf86cd799439011
   * 
   * @response 200 - Usuario eliminado exitosamente
   * @response 404 - Usuario no encontrado
   * @response 400 - ID inválido
   */
  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.usuarioService.delete(req.params.id);
      formatSuccess(res, null, 'Usuario eliminado exitosamente');
    } catch (error) {
      next(error);
    }
  };
  
  /**
   * Busca usuarios por ciudad
   * @route GET /api/usuarios/buscar?ciudad=:ciudad
   * @param req - Request object con query param ciudad
   * @param res - Response object
   * @param next - Next function
   * 
   * @queryParam ciudad - Nombre de la ciudad a buscar (case-insensitive)
   * @queryParam page - Número de página (default: 1)
   * @queryParam limit - Elementos por página (default: 10)
   * 
   * @example Request: GET /api/usuarios/buscar?ciudad=Lima&page=1&limit=10
   * 
   * @response 200 - Lista de usuarios que viven en la ciudad especificada
   * @response 400 - Parámetro ciudad requerido
   */
  buscarPorCiudad = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { ciudad } = req.query;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      
      if (!ciudad || typeof ciudad !== 'string') {
        throw new Error('El parámetro ciudad es requerido');
      }
      
      const result = await this.usuarioService.buscarPorCiudad(ciudad, page, limit);
      formatPaginated(res, result.data, result.total, result.page, result.limit, result.totalPages);
    } catch (error) {
      next(error);
    }
  };
}