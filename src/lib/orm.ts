import { MikroORM } from '@mikro-orm/core';
import mikroOrmConfig from '../mikro-orm.config';

declare global {
  // For Next.js dev mode where modules can be reloaded
  // eslint-disable-next-line no-var
  var __orm: MikroORM | null;
}

let orm: MikroORM | null = global.__orm || null;

export async function initORM(): Promise<MikroORM> {
  if (!orm) {
    orm = await MikroORM.init(mikroOrmConfig);
    global.__orm = orm;
  }
  return orm;
}


// // lib/orm.ts
// import { MikroORM } from '@mikro-orm/core';
// import mikroOrmConfig from '../mikro-orm.config';

// let orm: MikroORM | null = null;

// export async function initORM(): Promise<MikroORM> {
//   if (!orm) {
//     orm = await MikroORM.init(mikroOrmConfig);
//   }
//   return orm;
// }
