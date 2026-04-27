export interface DireccionResponseDTO {
  calle: string;
  ciudad: string;
  pais: string;
  codigo_postal: string;
}

export interface UsuarioResponseDTO {
  id: string;
  nombre: string;
  email: string;
  edad?: number;
  fecha_creacion: Date;
  direcciones: DireccionResponseDTO[];
}