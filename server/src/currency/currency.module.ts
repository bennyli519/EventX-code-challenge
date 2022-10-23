import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { CurrencyController } from './controllers/currency.controller';
import { CurrencyService } from './services/currency.service';

@Module({
  imports: [RedisModule],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class CurrencyModule {}
