export class ICurrencyItem {
  readonly assetId: string;
  readonly assetName: string;
  readonly updateTime: number;
  readonly price: number;
  readonly volume_1hrs_usd: number;
  readonly volume_1day_usd: number;
  readonly volume_1mth_usd: number;
}

export class GetCurrencyOutput {
  readonly code?: string;
  readonly data: ICurrencyItem[];
  readonly message?: string;
}
