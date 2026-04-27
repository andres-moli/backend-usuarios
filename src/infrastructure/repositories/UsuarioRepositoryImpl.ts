import { Usuario, Direccion } from '../../domain/entities/Usuario';
import { IUsuarioRepository, PaginatedResult } from '../../domain/repositories/IUsuarioRepository';
import { UsuarioModel } from '../database/mongoose/models/UsuarioModel';
import { NotFoundException } from '../../domain/exceptions/NotFoundException';

export class UsuarioRepositoryImpl implements IUsuarioRepository {
  private toDomain(doc: any): Usuario {
    const direcciones: Direccion[] = doc.direcciones?.map((d: any) => ({
      calle: d.calle,
      ciudad: d.ciudad,
      pais: d.pais,
      codigo_postal: d.codigo_postal,
    })) || [];
    
    return new Usuario(
      doc.nombre,
      doc.email,
      direcciones,
      doc.edad,
      doc._id.toString(),
      doc.fecha_creacion
    );
  }
  
  async create(usuario: Usuario): Promise<Usuario> {
    const doc = new UsuarioModel({
      nombre: usuario.nombre,
      email: usuario.email,
      edad: usuario.edad,
      direcciones: usuario.direcciones,
      fecha_creacion: usuario.fecha_creacion,
    });
    
    const saved = await doc.save();
    return this.toDomain(saved);
  }
  
  async findById(id: string): Promise<Usuario | null> {
    const doc = await UsuarioModel.findById(id);
    if (!doc) return null;
    return this.toDomain(doc);
  }
  
  async findAll(page: number, limit: number): Promise<PaginatedResult<Usuario>> {
    const skip = (page - 1) * limit;
    
    const [data, total] = await Promise.all([
      UsuarioModel.find().skip(skip).limit(limit).lean(),
      UsuarioModel.countDocuments(),
    ]);
    
    return {
      data: data.map(doc => this.toDomain(doc)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  
  async update(id: string, usuario: Partial<Usuario>): Promise<Usuario | null> {
    const updateData: any = {};
    if (usuario.nombre !== undefined) updateData.nombre = usuario.nombre;
    if (usuario.email !== undefined) updateData.email = usuario.email;
    if (usuario.edad !== undefined) updateData.edad = usuario.edad;
    if (usuario.direcciones !== undefined) updateData.direcciones = usuario.direcciones;
    
    const updated = await UsuarioModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    if (!updated) return null;
    return this.toDomain(updated);
  }
  
  async delete(id: string): Promise<boolean> {
    const result = await UsuarioModel.findByIdAndDelete(id);
    return !!result;
  }
  
  async findByEmail(email: string): Promise<Usuario | null> {
    const doc = await UsuarioModel.findOne({ email: email.toLowerCase() });
    if (!doc) return null;
    return this.toDomain(doc);
  }
  
  private normalizeCiudad(ciudad: string): string {
    return ciudad
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, '')
      .trim();
  }


  private createFlexiblePattern(ciudad: string): RegExp {
    // Normalizar la ciudad de búsqueda
    const normalized = this.normalizeCiudad(ciudad);
    
    // Crear patrón donde cada vocal puede tener o no acento
    const pattern = normalized.replace(/[aeiou]/gi, (match) => {
      switch(match.toLowerCase()) {
        case 'a': return '[aáÁ]';
        case 'e': return '[eéÉ]';
        case 'i': return '[iíÍ]';
        case 'o': return '[oóÓ]';
        case 'u': return '[uúÚüÜ]';
        default: return match;
      }
    });
    
    return new RegExp(pattern, 'i');
  }

  async findByCiudad(ciudad: string, page: number, limit: number): Promise<PaginatedResult<Usuario>> {
    const skip = (page - 1) * limit;
    

    const flexiblePattern = this.createFlexiblePattern(ciudad);

    const query = {
      'direcciones.ciudad': { $regex: flexiblePattern }
    };
    
    const [data, total] = await Promise.all([
      UsuarioModel.find(query).skip(skip).limit(limit).lean(),
      UsuarioModel.countDocuments(query),
    ]);

    return {
      data: data.map(doc => this.toDomain(doc)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
  
  async emailExists(email: string, excludeId?: string): Promise<boolean> {
    const query: any = { email: email.toLowerCase() };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    
    const count = await UsuarioModel.countDocuments(query);
    return count > 0;
  }
}