import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './mikro-orm.config';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(mikroOrmConfig),
    LogsModule,
  ],
})
export class AppModule {}


// import { Module } from '@nestjs/common';
// import { MikroOrmModule } from '@mikro-orm/nestjs';
// import mikroOrmConfig from './mikro-orm.config';
// import { RequestLog } from './entities/RequestLog';

// @Module({
//   imports: [
//     MikroOrmModule.forRoot(mikroOrmConfig),
//     MikroOrmModule.forFeature([RequestLog]),
//   ],
// })
// export class AppModule {}
