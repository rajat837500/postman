import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { RequestLog } from '../entities/request-log.entity';

@Injectable()
export class LogsService {
  constructor(
    @InjectEntityManager('default')
    private readonly em: EntityManager,
  ) {}

  

  async create(logData: Partial<RequestLog>): Promise<RequestLog> {
    const log = this.em.create(RequestLog, {
      method: logData.method || '',
      url: logData.url || '',
      responseStatus: logData.responseStatus || 0,
      createdAt: logData.createdAt || new Date(),
      ...logData,
    });
    await this.em.persistAndFlush(log);
    return log;
  }

  async findAll(): Promise<RequestLog[]> {
    return this.em.find(RequestLog, {}, { orderBy: { createdAt: 'DESC' } });
  }

  async findById(id: string): Promise<RequestLog | null> {
    return this.em.findOne(RequestLog, { id });
  }

  async delete(id: string): Promise<boolean> {
    const log = await this.em.findOne(RequestLog, { id });
    if (!log) return false;
    await this.em.removeAndFlush(log);
    return true;
  }
}



// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@mikro-orm/nestjs';
// import { EntityRepository } from '@mikro-orm/core';
// import { RequestLog } from '../entities/request-log.entity';

// @Injectable()
// export class LogsService {
//   constructor(
//     @InjectRepository(RequestLog)
//     private readonly requestLogRepo: EntityRepository<RequestLog>,
//   ) {}

//   async create(logData: Partial<RequestLog>): Promise<RequestLog> {
//     const log = this.requestLogRepo.create({
//       method: logData.method || '',
//       url: logData.url || '',
//       responseStatus: logData.responseStatus || 0,
//       createdAt: logData.createdAt || new Date(),
//     });
//     await this.requestLogRepo.persistAndFlush(log);
//     return log;
//   }

//   async findAll(): Promise<RequestLog[]> {
//     return this.requestLogRepo.findAll({ orderBy: { createdAt: 'DESC' } });
//   }

//   async findById(id: string): Promise<RequestLog | null> {
//     return this.requestLogRepo.findOne({ id });
//   }

//   async delete(id: string): Promise<boolean> {
//     const log = await this.requestLogRepo.findOne({ id });
//     if (!log) return false;
//     await this.requestLogRepo.removeAndFlush(log);
//     return true;
//   }
// }


// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@mikro-orm/nestjs';
// import { EntityRepository } from '@mikro-orm/core';
// import { RequestLog } from '../entities/request-log.entity';

// @Injectable()
// export class LogsService {
//   constructor(
//     @InjectRepository(RequestLog)
//     private readonly requestLogRepo: EntityRepository<RequestLog>,
//   ) {}

//   async create(logData: Partial<RequestLog>): Promise<RequestLog> {
//     const log = this.requestLogRepo.create({
//       method: logData.method || '',
//       url: logData.url || '',
//       responseStatus: logData.responseStatus || 0,
//       createdAt: logData.createdAt || new Date(),
//     });
//     await this.requestLogRepo.persistAndFlush(log);
//     return log;
//   }

//   async findAll(): Promise<RequestLog[]> {
//     return this.requestLogRepo.findAll({ orderBy: { createdAt: 'DESC' } });
//   }

//   async findById(id: string): Promise<RequestLog | null> {
//     return this.requestLogRepo.findOne({ id });
//   }

//   async delete(id: string): Promise<boolean> {
//     const log = await this.requestLogRepo.findOne({ id });
//     if (!log) return false;
//     await this.requestLogRepo.removeAndFlush(log);
//     return true;
//   }
// }
