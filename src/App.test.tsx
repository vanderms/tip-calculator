import { render, screen, fireEvent } from '@testing-library/react';
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

describe('Test radio buttons and custom input interaction', () => {
  it('should focus on custom input and initialize it to zero when custom radio is checked', () => {
    render(<Calculator />);
    const customRadio = screen.getByLabelText('Custom');
    const customInput = screen.getByLabelText('custom value');
    fireEvent.click(customRadio);
    expect(customInput).toHaveFocus();
    expect(customInput).toHaveValue(0);
  });

  it('should check custom radio when custom input gets a value', () => {
    render(<Calculator />);
    const customRadio = screen.getByLabelText('Custom');
    const customInput = screen.getByLabelText('custom value');
    fireEvent.change(customInput, { target: { value: '18' } });
    expect(customRadio).toBeChecked();
  });

  it('should set custom input value to null when other radio button is checked', () => {
    render(<Calculator />);
    const customInput = screen.getByLabelText('custom value');
    fireEvent.change(customInput, { target: { value: '18' } });
    const radio05 = screen.getByLabelText(/50%/);
    fireEvent.click(radio05);
    expect(customInput).toHaveValue(null);
  });
});

describe('test tip calculation', () => {});
