import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { AppConfigService } from './services/app-config.service';

@Module({
  imports: [RedisModule],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
