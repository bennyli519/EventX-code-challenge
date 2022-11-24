import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import {
  createClient,
  defineScript,
  RedisClientType,
  RedisDefaultModules,
  RedisScripts,
} from 'redis';

interface Scripts extends RedisScripts {
  zPop: typeof zPopScript;
}

const zPopScript = defineScript({
  SCRIPT: `local result = redis.call('zrange', KEYS[1], 0, 0);redis.call('zremrangebyrank', KEYS[1], 0, 0);return result[1];`,
  NUMBER_OF_KEYS: 1,
  transformArguments: (key: string): [string] => [key],
  transformReply: (reply: string): string | null => reply,
});

@Injectable()
export class RedisService
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  constructor() {
    this.client = createClient({
      url: this.redisUrl,
      scripts: {
        zPop: zPopScript,
      },
    });
    this.client.on('error', (err) => this.logger.error(err, '[onError] error'));
  }

  readonly client: RedisClientType<
    RedisDefaultModules,
    Record<string, never>,
    Scripts
  >;
  private readonly logger = new Logger(RedisService.name);

  async onApplicationBootstrap(): Promise<void> {
    this.logger.log('Connecting to Redis');
    await this.client.connect();
  }

  async onApplicationShutdown(): Promise<void> {
    this.logger.log('Disconnecting from Redis');
    await this.client.quit();
  }

  get redisUrl(): string {
    return process.env.REDIS_URL;
  }
}
