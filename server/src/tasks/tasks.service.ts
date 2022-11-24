import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { specifyCoinList } from '../constants/coins';
import { RedisService } from '../redis/services/redis.service';
import { AppConfigService } from '../app-config/services/app-config.service';

export const prefix = 'jssc:currency';

export interface ITaskItem {
  asset_id: string;
  name: string;
  type_is_crypto: boolean;
  data_quote_start: string;
  data_quote_end: string;
  data_orderbook_start: string;
  data_orderbook_end: string;
  data_trade_start: string;
  data_trade_end: string;
  data_symbols_count: number;
  volume_1hrs_usd: number;
  volume_1day_usd: number;
  volume_1mth_usd: number;
  price_usd: number;
  id_icon: string;
  data_start: number;
  data_end: number;
  updateTime: number;
}

@Injectable()
export class TasksService {
  constructor(
    private readonly httpService: HttpService,
    private readonly appConfigService: AppConfigService,
    private readonly redisService: RedisService,
  ) {}

  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_MINUTE, {
    name: 'requestCoin',
  })
  async handleCron() {
    try {
      const result = await firstValueFrom(
        this.httpService.get(this.appConfigService.coinAssetsUrl, {
          params: {
            filter_asset_id: specifyCoinList.join(';'),
          },
          headers: {
            'X-CoinAPI-Key': this.appConfigService.apiKey,
          },
        }),
      );
      this.saveData(result.data);
    } catch (error) {
      this.logger.error(`handleCron - ${error}`);
    }
  }

  //update data into rediss
  saveData(data: ITaskItem[]): void {
    if (!data.length) return;
    for (let item of data) {
      const { asset_id } = item;
      item.updateTime = Date.now();
      this.redisService.client.set(
        `${prefix}:${asset_id}`,
        JSON.stringify(item),
      );
    }
  }
}
