import React from 'react';
import { IData } from '../../models';
import './index.scss';

interface IProps {
  currentItem: IData;
}

export default function CoinWrapper({ currentItem }: IProps) {
  return (
    <div className="coin-wrapper">
      <h2>{currentItem.assetName}</h2>
      <div className="price">${currentItem.price}</div>
      <div className="volume-wrapper">
        <div className="name">volume:</div>
        <div className="num">{currentItem.volume_1hrs_usd || '-'}</div>
      </div>
    </div>
  );
}
