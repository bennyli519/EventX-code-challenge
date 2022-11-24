import { Injectable, Logger } from '@nestjs/common';
import { specifyCoinList } from '../../constants/coins';
import { RedisService } from '../../redis/services/redis.service';
import { ITaskItem, prefix } from '../../tasks/tasks.service';

@Injectable()
export class CurrencyService {
  constructor(protected readonly redisService: RedisService) {}
  private readonly logger = new Logger(CurrencyService.name);

  async getData(): Promise<ITaskItem[]> {
    const data = [];
    try {
      for (const assetName of specifyCoinList) {
        const res = await this.redisService.client.get(
          `${prefix}:${assetName}`,
        );
        if (res) {
          data.push(JSON.parse(res));
        }
      }
    } catch (error) {
      this.logger.error('CurrencyService error', error);
    }
    return data;
  }
}
