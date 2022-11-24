import axios from 'axios';

export interface IData {
  assetId: string;
  assetName: string;
  updateTime: number;
  price: number;
  volume_1hrs_usd: number;
  volume_1day_usd: number;
  volume_1mth_usd: number;
}

export type IResponse = {
  data: IData[];
  code: number;
  msg?: string;
};
const baseUrl = 'http://localhost:3001';

export const getCurrencyList = async () => {
  return axios.get<IResponse>(`${baseUrl}/currency`);
};
