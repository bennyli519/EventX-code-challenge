import { Controller, Get, Logger } from '@nestjs/common';
import { GetCurrencyOutput } from '../dto/get-currency.output';
import { CurrencyService } from '../services/currency.service';

@Controller('/currency')
export class CurrencyController {
  constructor(private readonly service: CurrencyService) {}
  private readonly logger = new Logger(CurrencyController.name);

  @Get()
  async getCurrency(): Promise<GetCurrencyOutput> {
    const res = await this.service.getData();

    if (!res) {
      this.logger.log(Date.now(), 'getCurrency Empty');
      return { data: [] };
    }

    const formatData = res.map((item) => ({
      assetId: item.asset_id,
      assetName: item.name,
      updateTime: item.updateTime,
      price: item.price_usd,
      volume_1hrs_usd: item.volume_1hrs_usd,
      volume_1day_usd: item.volume_1day_usd,
      volume_1mth_usd: item.volume_1mth_usd,
    }));

    return { data: formatData };
  }
}
