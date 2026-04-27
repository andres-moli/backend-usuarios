import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';
import { UsuarioService } from '../../application/services/UsuarioService';
import { UsuarioRepositoryImpl } from '../../infrastructure/repositories/UsuarioRepositoryImpl';
import { MemoryCacheService } from '../../infrastructure/cache/MemoryCacheService';
import { validateRequest } from '../middlewares/validation';
import { CreateUsuarioSchema } from '../../application/dtos/CreateUsuarioDTO';
import { UpdateUsuarioSchema } from '../../application/dtos/UpdateUsuarioDTO';
import { rateLimiter } from '../middlewares/rateLimiter';

const router = Router();

const usuarioRepository = new UsuarioRepositoryImpl();
const cacheService = new MemoryCacheService(parseInt(process.env.CACHE_TTL || '300'));
const usuarioService = new UsuarioService(usuarioRepository, cacheService);
const usuarioController = new UsuarioController(usuarioService);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUsuarioRequest'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResponse'
 *       400:
 *         description: Error de validación
 *       409:
 *         description: Email duplicado
 */
router.post('/', rateLimiter, validateRequest(CreateUsuarioSchema), usuarioController.create);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener lista paginada de usuarios
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Elementos por página
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */
router.get('/', rateLimiter, usuarioController.findAll);

/**
 * @swagger
 * /api/usuarios/buscar:
 *   get:
 *     summary: Buscar usuarios por ciudad
 *     tags: [Usuarios]
 *     parameters:
 *       - in: query
 *         name: ciudad
 *         required: true
 *         schema:
 *           type: string
 *         description: Ciudad a buscar
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Usuarios encontrados
 *       400:
 *         description: Parámetro ciudad requerido
 */
router.get('/buscar', rateLimiter, usuarioController.buscarPorCiudad);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', rateLimiter, usuarioController.findById);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUsuarioRequest'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:id', rateLimiter, validateRequest(UpdateUsuarioSchema), usuarioController.update);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', rateLimiter, usuarioController.delete);

export default router;