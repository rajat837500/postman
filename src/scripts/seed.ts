// scripts/seed.ts
import { MikroORM } from '@mikro-orm/core';
import config from '../mikro-orm.config';
import { RequestLog } from '../entities/RequestLog';

async function seed() {
  const orm = await MikroORM.init(config);
  const em = orm.em.fork();

  console.log('Seeding data...');

  const sampleLog = em.create(RequestLog, {
    method: 'GET',
    url: '/api/test',
    headers: { 'user-agent': 'SeedBot/1.0' },
    body: null,
    responseStatus: 200,
    createdAt: new Date('2025-01-01T10:00:00Z'), 
    durationMs: 123,
  });

  await em.persistAndFlush(sampleLog);

  console.log('✔️ Seeded 1 request log.');

  await orm.close();
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
