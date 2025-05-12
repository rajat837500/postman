import { defineConfig } from '@mikro-orm/postgresql';
import { ReflectMetadataProvider } from '@mikro-orm/core';
import { RequestLog } from './entities/request-log.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  clientUrl: process.env.DATABASE_URL,
  entities: [RequestLog],
  metadataProvider: ReflectMetadataProvider,
  debug: true,
  driverOptions: {
    connection: {
      ssl: {
        rejectUnauthorized: false, // ✅ Accept Neon’s self-signed cert
      },
    },
  },
  migrations: {
    pathTs: './src/migrations',
    path: './dist/migrations',
    glob: '!(*.d).{ts,js}',
  },
});


// // mikro-orm.config.ts
// import { defineConfig } from '@mikro-orm/postgresql';
// import { ReflectMetadataProvider } from '@mikro-orm/core';
// import { RequestLog } from '@/entities/request-log.entity';
// import * as dotenv from 'dotenv';

// dotenv.config();

// console.log('DATABASE_URL:', process.env.DATABASE_URL); 

// export default defineConfig({
//   entities: [RequestLog],
//   // dbName: 'neondb',
//   clientUrl: process.env.DATABASE_URL,
//   metadataProvider: ReflectMetadataProvider,
//   debug: true,
//   migrations: {
//     pathTs: './src/migrations',
//     path: './dist/migrations',
//     glob: '!(*.d).{ts,js}',
//   },
// });


// import { defineConfig } from '@mikro-orm/postgresql';
// import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
// import { RequestLog } from './entities/request-log.entity';
// import * as dotenv from 'dotenv';

// dotenv.config();

// export default defineConfig({
//   entities: [RequestLog],
//   dbName: 'neondb',
//   clientUrl: process.env.DATABASE_URL,
//   metadataProvider: TsMorphMetadataProvider,
//   debug: true,
//   migrations: {
//     pathTs: './src/migrations',
//     path: './dist/migrations',
//     glob: '!(*.d).{ts,js}',
//   },
//   driverOptions: {
//     connection: {
//       ssl: {
//         rejectUnauthorized: false, // Accept self-signed certificates (NeonDB requires this)
//       },
//     },
//   },
// });


// import { defineConfig } from '@mikro-orm/postgresql';
// import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
// import { RequestLog } from './entities/request-log.entity';
// import * as dotenv from 'dotenv';

// dotenv.config();

// export default defineConfig({
//   entities: [RequestLog],
//   dbName: 'neondb',
//   clientUrl: process.env.DATABASE_URL,
//   metadataProvider: TsMorphMetadataProvider,
//   debug: true,
//   migrations: {
//     pathTs: './src/migrations',
//     path: './dist/migrations',
//     glob: '!(*.d).{ts,js}',
//   },
// });


// import { defineConfig } from '@mikro-orm/postgresql';
// import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
// import { RequestLog } from './entities/request-log.entity';
// import * as dotenv from 'dotenv';

// dotenv.config();

// export default defineConfig({
//   entities: [RequestLog],
//   dbName: 'neondb',
//   type: 'postgresql',
//   clientUrl: process.env.DATABASE_URL,
//   metadataProvider: TsMorphMetadataProvider,
//   debug: true,
//   migrations: {
//     pathTs: './src/migrations',
//     path: './dist/migrations',
//     glob: '!(*.d).{ts,js}',
//   },
// });


// import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
// import { RequestLog } from './entities/RequestLog';
// import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
// import * as dotenv from 'dotenv';

// dotenv.config();

// const config: MikroOrmModuleOptions = {
//   entities: [RequestLog],
//   dbName: 'neondb',
//   // type: 'postgresql', // Removed as it is not a valid property for MikroOrmModuleOptions
//   clientUrl: process.env.DATABASE_URL,
//   metadataProvider: TsMorphMetadataProvider,
//   debug: true,
//   migrations: {
//   pathTs: './src/migrations', // path to store migration files
//   glob: '!(*.d).{ts,js}',      // supports both .ts and .js
// },

// };

// export default config;


// import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
// import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
// import { PostgreSqlDriver } from '@mikro-orm/postgresql';
// import { ConfigService } from '@nestjs/config';
// import { EntityName1 } from './entities/entity1.entity'; // replace with your entities

// const mikroOrmConfig = async (
//   configService: ConfigService,
// ): Promise<MikroOrmModuleOptions> => ({
//   type: 'postgresql',
//   driver: PostgreSqlDriver,
//   metadataProvider: TsMorphMetadataProvider,
//   clientUrl: configService.get<string>('DATABASE_URL'),
//   entities: [EntityName1], // or use glob path like './dist/entities/*.entity.js'
//   entitiesTs: ['./src/entities'], // needed for dev mode
//   forceEntityConstructor: true,
//   debug: true,
//   ssl: true,
// });

// export default mikroOrmConfig;



// // mikro-orm.config.ts
// import { Options } from '@mikro-orm/core';
// import { PostgreSqlDriver } from '@mikro-orm/postgresql';
// import { RequestLog } from './entities/RequestLog'; // Adjust if needed
// import * as dotenv from 'dotenv'

// dotenv.config({ path: '.env.local' });

// const config: Options<PostgreSqlDriver> = {
//   entities: [RequestLog],
//   dbName: 'neondb', // optional if using clientUrl
//   driver: PostgreSqlDriver,
//   clientUrl: process.env.DATABASE_URL,
//   forceUtcTimezone: true,
//   timezone: 'UTC',
//   debug: process.env.NODE_ENV !== 'production',
// };

// export default config;



// // mikro-orm.config.ts
// import { Options } from '@mikro-orm/core';
// import { RequestLog } from './src/entities/RequestLog'; // adjust path as needed

// const config: Options = {
//   entities: [RequestLog],
//   dbName: 'your_db_name', // optional if using URL
//   driver: require('@mikro-orm/postgresql').PostgreSqlDriver,
//   clientUrl: process.env.DATABASE_URL, // Neon DB URL
//   forceUtcTimezone: true,
//   timezone: 'UTC',
//   debug: process.env.NODE_ENV !== 'production',
// };

// export default config;



// // mikro-orm.config.ts
// import { Options } from '@mikro-orm/core';
// import { RequestLog } from './src/entities/RequestLog';



// const config: Options = {
//   type: 'postgresql',
//   clientUrl: process.env.DATABASE_URL,
//   entities: [RequestLog],
//   debug: process.env.NODE_ENV !== 'production',
//   driverOptions: {
//     connection: {
//       ssl: {
//         rejectUnauthorized: false, // needed for Neon SSL
//       },
//     },
//   },
// };

// export default config;
