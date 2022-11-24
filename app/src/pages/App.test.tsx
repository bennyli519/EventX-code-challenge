import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App/> Component', () => {
  it('should render the UI successfully', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toHaveTextContent(
      'Cryptocurrency Realtime Price'
    );
    const titleElement = screen.getByText(/Cryptocurrency/i);
    expect(titleElement).toBeInTheDocument();
  });
});
