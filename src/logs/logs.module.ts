import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RequestLog } from '../entities/request-log.entity';
import { LogsService } from './logs.service';
import { LogsController } from './logs.controller';

@Module({
//   imports: [MikroOrmModule.forFeature([RequestLog])],
  providers: [LogsService],
  controllers: [LogsController],
})
export class LogsModule {}
