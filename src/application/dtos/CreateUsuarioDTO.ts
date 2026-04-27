import { z } from 'zod';

const DireccionSchema = z.object({
  calle: z.string().min(1, 'La calle es requerida'),
  ciudad: z.string().min(1, 'La ciudad es requerida'),
  pais: z.string().min(1, 'El país es requerido'),
  codigo_postal: z.string().min(1, 'El código postal es requerido'),
});

export const CreateUsuarioSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  email: z.string().email('Email inválido'),
  edad: z.number().int().positive().max(150).optional(),
  direcciones: z.array(DireccionSchema).default([]),
});

export type CreateUsuarioDTO = z.infer<typeof CreateUsuarioSchema>;