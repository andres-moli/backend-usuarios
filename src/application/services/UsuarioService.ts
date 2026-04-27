import { Usuario } from '../../domain/entities/Usuario';
import { IUsuarioRepository } from '../../domain/repositories/IUsuarioRepository';
import { ICacheService } from '../interfaces/ICacheService';
import { NotFoundException } from '../../domain/exceptions/NotFoundException';
import { ValidationException } from '../../domain/exceptions/ValidationException';
import { CreateUsuarioDTO, CreateUsuarioSchema } from '../dtos/CreateUsuarioDTO';
import { UpdateUsuarioDTO, UpdateUsuarioSchema } from '../dtos/UpdateUsuarioDTO';
import { UsuarioResponseDTO } from '../dtos/UsuarioResponseDTO';
import { validate } from '../../interfaces/middlewares/validation';

export class UsuarioService {
  constructor(
    private usuarioRepository: IUsuarioRepository,
    private cacheService: ICacheService
  ) {}

  private mapToResponseDTO(usuario: Usuario): UsuarioResponseDTO {
    return {
      id: usuario.id!,
      nombre: usuario.nombre,
      email: usuario.email,
      edad: usuario.edad,
      fecha_creacion: usuario.fecha_creacion,
      direcciones: usuario.direcciones,
    };
  }

  private getCacheKey(id: string): string {
    return `usuario:${id}`;
  }

  private getListCacheKey(page: number, limit: number): string {
    return `usuarios:list:${page}:${limit}`;
  }

  private getSearchCacheKey(ciudad: string, page: number, limit: number): string {
    return `usuarios:search:${ciudad}:${page}:${limit}`;
  }

  async create(createDto: CreateUsuarioDTO): Promise<UsuarioResponseDTO> {
    const validatedData = CreateUsuarioSchema.parse(createDto);

    const emailExists = await this.usuarioRepository.emailExists(validatedData.email);
    if (emailExists) {
      throw new ValidationException('El email ya está registrado', ['El email debe ser único']);
    }

    const usuario = Usuario.create(validatedData);
    const created = await this.usuarioRepository.create(usuario);

    await this.cacheService.delPattern('usuarios:*');

    return this.mapToResponseDTO(created);
  }

  async findById(id: string): Promise<UsuarioResponseDTO> {
    const cacheKey = this.getCacheKey(id);
    const cached = await this.cacheService.get<UsuarioResponseDTO>(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    const usuario = await this.usuarioRepository.findById(id);
    if (!usuario) {
      throw new NotFoundException('Usuario', id);
    }
    
    const response = this.mapToResponseDTO(usuario);
    await this.cacheService.set(cacheKey, response);
    
    return response;
  }

  async findAll(page: number = 1, limit: number = 10): Promise<{
    data: UsuarioResponseDTO[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const cacheKey = this.getListCacheKey(page, limit);
    const cached = await this.cacheService.get<any>(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    const result = await this.usuarioRepository.findAll(page, limit);
    const response = {
      ...result,
      data: result.data.map(u => this.mapToResponseDTO(u)),
    };
    
    await this.cacheService.set(cacheKey, response);
    
    return response;
  }

  async update(id: string, updateDto: UpdateUsuarioDTO): Promise<UsuarioResponseDTO> {
    const validatedData = UpdateUsuarioSchema.parse(updateDto);

    if (validatedData.email) {
      const emailExists = await this.usuarioRepository.emailExists(validatedData.email, id);
      if (emailExists) {
        throw new ValidationException('El email ya está registrado', ['El email debe ser único']);
      }
    }

    const updated = await this.usuarioRepository.update(id, validatedData);
    if (!updated) {
      throw new NotFoundException('Usuario', id);
    }

    await this.cacheService.del(this.getCacheKey(id));
    await this.cacheService.delPattern('usuarios:*');

    return this.mapToResponseDTO(updated);
  }

  async delete(id: string): Promise<void> {
    const deleted = await this.usuarioRepository.delete(id);
    if (!deleted) {
      throw new NotFoundException('Usuario', id);
    }
    
    await this.cacheService.del(this.getCacheKey(id));
    await this.cacheService.delPattern('usuarios:*');
  }

  async buscarPorCiudad(ciudad: string, page: number = 1, limit: number = 10): Promise<{
    data: UsuarioResponseDTO[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const cacheKey = this.getSearchCacheKey(ciudad, page, limit);
    const cached = await this.cacheService.get<any>(cacheKey);
    
    if (cached) {
      return cached;
    }
    
    const result = await this.usuarioRepository.findByCiudad(ciudad, page, limit);
    const response = {
      ...result,
      data: result.data.map(u => this.mapToResponseDTO(u)),
    };
    
    await this.cacheService.set(cacheKey, response);
    
    return response;
  }
}