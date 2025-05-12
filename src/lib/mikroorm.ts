// lib/mikroorm.ts
import { MikroORM } from '@mikro-orm/core';
import config from '../mikro-orm.config';

let orm: MikroORM | null = null;

export const getORM = async (): Promise<MikroORM> => {
  if (!orm) {
    orm = await MikroORM.init(config);
  }
  return orm;
};



// import { Options } from '@mikro-orm/core';
// import { RequestLog } from '../entities/RequestLog';

// const config: Options = {
//   type: 'mongo',
//   clientUrl: process.env.MONGODB_URI!, // MongoDB Atlas connection string from .env.local
//   entities: [RequestLog],
//   debug: true,
// };

// export default config;