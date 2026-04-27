import { z } from 'zod';
import { CreateUsuarioSchema } from './CreateUsuarioDTO';

export const UpdateUsuarioSchema = CreateUsuarioSchema.partial();

export type UpdateUsuarioDTO = z.infer<typeof UpdateUsuarioSchema>;