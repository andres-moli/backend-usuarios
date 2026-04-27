export interface Direccion {
  calle: string;
  ciudad: string;
  pais: string;
  codigo_postal: string;
}

export interface IUsuario {
  id?: string;
  nombre: string;
  email: string;
  edad?: number;
  fecha_creacion: Date;
  direcciones: Direccion[];
}

export class Usuario {
  constructor(
    public readonly nombre: string,
    public readonly email: string,
    public readonly direcciones: Direccion[],
    public readonly edad?: number,
    public readonly id?: string,
    public readonly fecha_creacion: Date = new Date()
  ) {}

  static create(data: Partial<IUsuario>): Usuario {
    return new Usuario(
      data.nombre!,
      data.email!,
      data.direcciones || [],
      data.edad,
      data.id,
      data.fecha_creacion || new Date()
    );
  }

  update(data: Partial<IUsuario>): Usuario {
    return new Usuario(
      data.nombre ?? this.nombre,
      data.email ?? this.email,
      data.direcciones ?? this.direcciones,
      data.edad ?? this.edad,
      this.id,
      this.fecha_creacion
    );
  }
}