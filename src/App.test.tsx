import { render, screen } from '@testing-library/react';
import Calculator from './components/calculator';

it('should start with zero as default value for inputs and outputs', () => {
  render(<Calculator />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
