import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import CoinWrapper from './index';

describe('<CoinWrapper/> Component', () => {
  it('should render the UI successfully', () => {
    const testProps = {
      assetId: 'BTC',
      assetName: 'Bitcoin',
      price: 19149.38481912532,
      updateTime: 1666523760563,
      volume_1day_usd: 385834252697567040,
      volume_1hrs_usd: 1184089825248.19,
      volume_1mth_usd: 1.7318788627373228e21,
    };
    render(<CoinWrapper currentItem={testProps} />);
    expect(screen.getByText(testProps.assetName)).toBeInTheDocument();
    expect(screen.getByText(/volume/)).toBeInTheDocument();
    expect(screen.getByText(testProps.volume_1hrs_usd)).toBeInTheDocument();
  });
});
