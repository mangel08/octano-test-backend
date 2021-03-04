import { join } from 'path';

export default {
  type: 'postgres',
  name: 'octano',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT, 10) || 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [join(__dirname, '../**/**/*entity{.ts,.js}')],
  autoLoadEntites: true,
  // Implementaremos Migrations.
  /** Recursos
   *  * https://typeorm.io/#/migrations
   */
  // migrationsRun: true,
  migrations: [join(__dirname, '../migration/**/*{.ts,.js}')],
  migrationsTableName: 'migrations',
  cli: {
    migrationsDir: 'src/migration',
    entitiesDir: __dirname + '/../**/**/*entity{.ts,.js}',
  },

  // Activar SOLO MANUALMENTE en DESARROLLO SI ES NECESARIO (DESACTIVAR EN PRODUCCION).
  synchronize: true,
  logging: true,
  logger: 'debug',
};
