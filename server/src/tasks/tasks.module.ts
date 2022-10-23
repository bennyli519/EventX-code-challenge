import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppConfigModule } from 'src/app-config/app-config.module';
import { RedisModule } from 'src/redis/redis.module';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    AppConfigModule,
    RedisModule,
    HttpModule.register({
      timeout: 5000,
      timeoutErrorMessage: 'request timeout',
    }),
  ],
  providers: [TasksService],
})
export class TasksModule {}
