import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfigService {
  constructor() {
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

  get coinAssetsUrl(): string {
    return `${process.env.COIN_API_URL}/v1/assets`;
  }

  get apiKey(): string {
    return process.env.API_KEY;
  }
}
