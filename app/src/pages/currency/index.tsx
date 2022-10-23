import React, { useState, useEffect, useRef } from 'react';
import CoinWrapper from './components/CoinWrapper';
import './index.scss';
import { getCurrencyList, IData } from './models';

export default function Currency() {
  const [list, setList] = useState<IData[]>();
  const timer = useRef(null);

  const getData = async () => {
    const res = await getCurrencyList();
    if (res.data.data.length) {
      setList(res.data.data);
    }
  };

  useEffect(() => {
    getData();
    timer.current = setInterval(async () => {
      await getData();
    }, 30 * 1000);
    return () => {
      clearInterval(timer.current as ReturnType<typeof setInterval>);
    };
  }, []);

  return (
    <div className="currency-page-contaienr">
      <h1>Cryptocurrency Realtime Price</h1>

      <div className="coin-pan">
        {(list || []).map((item) => {
          return <CoinWrapper key={item.assetId} currentItem={item} />;
        })}
      </div>
    </div>
  );
}
