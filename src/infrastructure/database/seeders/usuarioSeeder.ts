import mongoose from 'mongoose';
import { UsuarioModel } from '../mongoose/models/UsuarioModel';
import { logger } from '../../../interfaces/middlewares/logger';
import dotenv from 'dotenv';

dotenv.config();

const usuariosColombia = [
  {
    nombre: 'Carlos Martínez',
    email: 'carlos.martinez@example.com',
    edad: 28,
    direcciones: [
      {
        calle: 'Calle 70 # 45-12',
        ciudad: 'Bogotá',
        pais: 'Colombia',
        codigo_postal: '110221',
      },
    ],
  },
  {
    nombre: 'María Rodríguez',
    email: 'maria.rodriguez@example.com',
    edad: 34,
    direcciones: [
      {
        calle: 'Carrera 43A # 10-50',
        ciudad: 'Medellín',
        pais: 'Colombia',
        codigo_postal: '050021',
      },
    ],
  },
  {
    nombre: 'Jorge Sánchez',
    email: 'jorge.sanchez@example.com',
    edad: 42,
    direcciones: [
      {
        calle: 'Calle 13 # 8-45',
        ciudad: 'Cali',
        pais: 'Colombia',
        codigo_postal: '760001',
      },
    ],
  },
  {
    nombre: 'Ana González',
    email: 'ana.gonzalez@example.com',
    edad: 26,
    direcciones: [
      {
        calle: 'Carrera 52 # 72-30',
        ciudad: 'Barranquilla',
        pais: 'Colombia',
        codigo_postal: '080001',
      },
    ],
  },
  {
    nombre: 'Luis Fernández',
    email: 'luis.fernandez@example.com',
    edad: 31,
    direcciones: [
      {
        calle: 'Calle 34 # 20-15',
        ciudad: 'Cartagena',
        pais: 'Colombia',
        codigo_postal: '130001',
      },
    ],
  },
  {
    nombre: 'Diana López',
    email: 'diana.lopez@example.com',
    edad: 29,
    direcciones: [
      {
        calle: 'Carrera 27 # 15-80',
        ciudad: 'Bucaramanga',
        pais: 'Colombia',
        codigo_postal: '680001',
      },
    ],
  },
  {
    nombre: 'Andrés Pérez',
    email: 'andres.perez@example.com',
    edad: 37,
    direcciones: [
      {
        calle: 'Calle 19 # 6-42',
        ciudad: 'Pereira',
        pais: 'Colombia',
        codigo_postal: '660001',
      },
    ],
  },
  {
    nombre: 'Laura Gómez',
    email: 'laura.gomez@example.com',
    edad: 25,
    direcciones: [
      {
        calle: 'Carrera 15 # 10-20',
        ciudad: 'Santa Marta',
        pais: 'Colombia',
        codigo_postal: '470001',
      },
    ],
  },
  {
    nombre: 'Ricardo Díaz',
    email: 'ricardo.diaz@example.com',
    edad: 33,
    direcciones: [
      {
        calle: 'Calle 8 # 12-35',
        ciudad: 'Ibagué',
        pais: 'Colombia',
        codigo_postal: '730001',
      },
    ],
  },
  {
    nombre: 'Patricia Rojas',
    email: 'patricia.rojas@example.com',
    edad: 41,
    direcciones: [
      {
        calle: 'Carrera 9 # 22-18',
        ciudad: 'Manizales',
        pais: 'Colombia',
        codigo_postal: '170001',
      },
    ],
  },
  {
    nombre: 'Fernando Torres',
    email: 'fernando.torres@example.com',
    edad: 27,
    direcciones: [
      {
        calle: 'Calle 45 # 30-60',
        ciudad: 'Neiva',
        pais: 'Colombia',
        codigo_postal: '410001',
      },
    ],
  },
  {
    nombre: 'Carmen Ruiz',
    email: 'carmen.ruiz@example.com',
    edad: 38,
    direcciones: [
      {
        calle: 'Carrera 12 # 4-25',
        ciudad: 'Villavicencio',
        pais: 'Colombia',
        codigo_postal: '500001',
      },
    ],
  },
  {
    nombre: 'Miguel Ángel Castro',
    email: 'miguel.castro@example.com',
    edad: 35,
    direcciones: [
      {
        calle: 'Calle 100 # 25-90',
        ciudad: 'Bogotá',
        pais: 'Colombia',
        codigo_postal: '110111',
      },
    ],
  },
  {
    nombre: 'Sofía Morales',
    email: 'sofia.morales@example.com',
    edad: 24,
    direcciones: [
      {
        calle: 'Carrera 50 # 60-25',
        ciudad: 'Medellín',
        pais: 'Colombia',
        codigo_postal: '050034',
      },
    ],
  },
  {
    nombre: 'Julián Ortega',
    email: 'julian.ortega@example.com',
    edad: 30,
    direcciones: [
      {
        calle: 'Calle 5 # 15-30',
        ciudad: 'Cúcuta',
        pais: 'Colombia',
        codigo_postal: '540001',
      },
    ],
  },
  {
    nombre: 'Valentina Vargas',
    email: 'valentina.vargas@example.com',
    edad: 26,
    direcciones: [
      {
        calle: 'Carrera 18 # 40-55',
        ciudad: 'Armenia',
        pais: 'Colombia',
        codigo_postal: '630001',
      },
    ],
  },
  {
    nombre: 'Gabriel Jiménez',
    email: 'gabriel.jimenez@example.com',
    edad: 45,
    direcciones: [
      {
        calle: 'Calle 22 # 7-12',
        ciudad: 'Popayán',
        pais: 'Colombia',
        codigo_postal: '190001',
      },
    ],
  },
  {
    nombre: 'Natalia Herrera',
    email: 'natalia.herrera@example.com',
    edad: 32,
    direcciones: [
      {
        calle: 'Carrera 33 # 25-70',
        ciudad: 'Sincelejo',
        pais: 'Colombia',
        codigo_postal: '700001',
      },
    ],
  },
  {
    nombre: 'Alejandro Mendoza',
    email: 'alejandro.mendoza@example.com',
    edad: 29,
    direcciones: [
      {
        calle: 'Calle 15 # 9-45',
        ciudad: 'Riohacha',
        pais: 'Colombia',
        codigo_postal: '440001',
      },
    ],
  },
  {
    nombre: 'Isabella Rincón',
    email: 'isabella.rincon@example.com',
    edad: 27,
    direcciones: [
      {
        calle: 'Carrera 7 # 14-80',
        ciudad: 'Tunja',
        pais: 'Colombia',
        codigo_postal: '150001',
      },
    ],
  },
];

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/prueba_backend';
    
    await mongoose.connect(mongoUri);
    logger.info('Conectado a MongoDB para seeding');
    
    await UsuarioModel.deleteMany({});
    logger.info('Usuarios existentes eliminados');
    
    const usuariosConFechas = usuariosColombia.map(usuario => ({
      ...usuario,
      fecha_creacion: new Date(),
    }));
    
    const result = await UsuarioModel.insertMany(usuariosConFechas);
    logger.info(`${result.length} usuarios de Colombia insertados exitosamente`);
    
    console.log('\n📊 Resumen de usuarios insertados:');
    console.log('=================================');
    
    const ciudadesCount = await UsuarioModel.aggregate([
      { $unwind: '$direcciones' },
      { $group: { _id: '$direcciones.ciudad', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    
    console.log('\n📈 Distribución por ciudad:');
    ciudadesCount.forEach((item: any) => {
      console.log(`   - ${item._id}: ${item.count} usuario(s)`);
    });
    
    console.log('\n✅ Seed completado exitosamente');
    console.log('=================================\n');
    
    process.exit(0);
  } catch (error) {
    logger.error('Error durante el seeding:', error);
    console.error('\n❌ Error detallado:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seedDatabase();
}

export { usuariosColombia, seedDatabase };