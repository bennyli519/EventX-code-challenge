import { Injectable } from '@nestjs/common';
import { RedisService } from '../../redis/services/redis.service';

@Injectable()
export class AppConfigService {
  constructor(private readonly redisService: RedisService) {
    // Check if the environment variables are set.
    const cases: Array<keyof AppConfigService> = ['redisUrl'];
    for (const c of cases) {
      if (!this[c]) {
        throw new Error(`${AppConfigService.name}: ${c} is invalid`);
      }
    }
  }

  get redisUrl(): string {
    return process.env.REDIS_URL;
  }
}
