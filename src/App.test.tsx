import { render, screen } from '@testing-library/react';
import Calculator from './components/calculator';

describe('Test initialization values', () => {
  it('should initialize bill input with value zero', () => {
    render(<Calculator />);
    const bill = screen.getByLabelText(/bill/i);
    expect(bill).toHaveValue(0);
  });

  it('should initialize all radio buttons not checked', () => {
    render(<Calculator />);
    const radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach((button) => {
      expect(button).not.toBeChecked();
    });
  });

  it('should initialize number of people input with value 1', () => {
    render(<Calculator />);
    const npeople = screen.getByLabelText(/number of people/i);
    expect(npeople).toHaveValue(1);
  });

  it('should not render number of people error message on initialization', () => {
    render(<Calculator />);
    const errorMessage = screen.queryByText("Can't be zero");
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('should calc tip amount per person equals to 0 on initialization', () => {
    render(<Calculator />);
    const tipOutput = screen.getByLabelText(/tip amount/i);
    expect(tipOutput).toHaveTextContent('$0.00');
  });

  it('should calt total value per person equals to 0 on initialization', () => {
    render(<Calculator />);
    const totalOutput = screen.getByLabelText(/total/i);
    expect(totalOutput).toHaveTextContent('$0.00');
  });
});
