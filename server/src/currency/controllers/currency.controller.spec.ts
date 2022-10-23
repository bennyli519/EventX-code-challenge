import { Test } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { CurrencyService } from '../services/currency.service';
import { CurrencyController } from './currency.controller';

const moduleMocker = new ModuleMocker(global);
describe('CurrencyController', () => {
  let currencyController: CurrencyController;
  let currencyService: CurrencyService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CurrencyController],
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    currencyController = moduleRef.get(CurrencyController);
    currencyService = moduleRef.get(CurrencyService);
  });

  describe('getCurrency', () => {
    it('should works', async () => {
      const mockData = {
        asset_id: 'BTC',
        name: 'Bitcoin',
        type_is_crypto: 1,
        data_quote_start: '2014-02-24T17:43:05.0000000Z',
        data_quote_end: '2022-10-21T00:00:00.0000000Z',
        data_orderbook_start: '2014-02-24T17:43:05.0000000Z',
        data_orderbook_end: '2022-10-22T00:00:00.0000000Z',
        data_trade_start: '2010-07-17T23:09:17.0000000Z',
        data_trade_end: '2022-10-22T00:00:00.0000000Z',
        data_symbols_count: 119041,
        volume_1hrs_usd: 787351868879.78,
        volume_1day_usd: 373012962668957801.65,
        volume_1mth_usd: 2757142054108338498213.15,
        price_usd: 19168.602698047173271236087275,
        id_icon: '4caf2b16-a017-4e26-a348-2cea69c34cba',
        data_start: '2010-07-17',
        data_end: '2022-10-22',
        updateTime: 1111,
      };
      (currencyService.getData as jest.Mock).mockResolvedValue([mockData]);
      const res = await currencyController.getCurrency();
      expect(res.data).toStrictEqual([
        {
          assetId: mockData.asset_id,
          assetName: mockData.name,
          updateTime: mockData.updateTime,
          price: mockData.price_usd,
          volume_1hrs_usd: mockData.volume_1hrs_usd,
          volume_1day_usd: mockData.volume_1day_usd,
          volume_1mth_usd: mockData.volume_1mth_usd,
        },
      ]);
      console.log(res);
    });

    it('should return [] when redis is empty', async () => {
      (currencyService.getData as jest.Mock).mockResolvedValue([]);
      const res = await currencyController.getCurrency();
      expect(res).toStrictEqual({ data: [] });
    });
  });
});
