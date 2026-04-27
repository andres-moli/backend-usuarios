import { Schema } from 'mongoose';

const DireccionSubSchema = new Schema({
  calle: { type: String, required: true },
  ciudad: { type: String, required: true },
  pais: { type: String, required: true },
  codigo_postal: { type: String, required: true },
}, { _id: false });

export const usuarioSchema = new Schema({
  nombre: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  edad: { type: Number, min: 0, max: 150 },
  fecha_creacion: { type: Date, default: Date.now },
  direcciones: [DireccionSubSchema],
}, {
  timestamps: false,
  versionKey: false,
});

usuarioSchema.index({ 'direcciones.ciudad': 1 });