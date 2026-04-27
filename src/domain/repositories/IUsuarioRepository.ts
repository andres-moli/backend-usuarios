import { Usuario } from '../entities/Usuario';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IUsuarioRepository {
  create(usuario: Usuario): Promise<Usuario>;
  findById(id: string): Promise<Usuario | null>;
  findAll(page: number, limit: number): Promise<PaginatedResult<Usuario>>;
  update(id: string, usuario: Partial<Usuario>): Promise<Usuario | null>;
  delete(id: string): Promise<boolean>;
  findByEmail(email: string): Promise<Usuario | null>;
  findByCiudad(ciudad: string, page: number, limit: number): Promise<PaginatedResult<Usuario>>;
  emailExists(email: string, excludeId?: string): Promise<boolean>;
}