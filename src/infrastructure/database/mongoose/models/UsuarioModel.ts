import mongoose from 'mongoose';
import { usuarioSchema } from '../schemas/UsuarioSchema';

export const UsuarioModel = mongoose.model('Usuario', usuarioSchema);