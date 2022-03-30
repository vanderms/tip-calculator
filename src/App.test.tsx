import { render, screen, fireEvent } from '@testing-library/react';
import Calculator from './components/calculator';

describe('Test initialization values', () => {
  it('should initialize bill input empty', () => {
    render(<Calculator />);
    const bill = screen.getByLabelText(/bill/i);
    expect(bill).toHaveValue(null);
  });

  it('should initialize all radio buttons not checked', () => {
    render(<Calculator />);
    const radioButtons = screen.getAllByRole('radio');
    radioButtons.forEach((button) => {
      expect(button).not.toBeChecked();
    });
  });

  it('should initialize number of people input empty', () => {
    render(<Calculator />);
    const npeople = screen.getByLabelText(/number of people/i);
    expect(npeople).toHaveValue(null);
  });

  it('should not render number of people error message on initialization', () => {
    render(<Calculator />);
    const errorMessage = screen.queryByText("Can't be zero");
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('should initialize reset button disabled', () => {
    render(<Calculator />);
    const resetButton = screen.getByText(/reset/i);
    expect(resetButton).toBeDisabled();
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

describe('Test user interface interactions', () => {
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

  it('should display error message when number of people equals zero', () => {
    render(<Calculator />);
    const npeople = screen.getByLabelText(/number of people/i);
    fireEvent.change(npeople, { target: { value: '0' } });
    const errorMessage = screen.queryByText("Can't be zero");
    expect(errorMessage).toBeInTheDocument();
  });

  it.each([['Bill'], ['custom value'], ['Number of People']])(
    'should enable reset button when %s input default value is changed',
    (label) => {
      render(<Calculator />);
      const resetButton = screen.getByText(/reset/i);
      const input = screen.getByLabelText(label);
      fireEvent.change(input, { target: { value: '2' } });
      expect(resetButton).toBeEnabled();
    }
  );
});

describe('Test calculation logic', () => {
  it.each([
    [142.55, '15%', 5, 4.27, 32.78],
    [280.22, '5%', 3, 4.67, 98.07],
    [46.75, '50%', 7, 3.33, 10.0],
    [116.74, '18%', 4, 5.25, 34.43],
  ])(
    'should output the expect results in the following case test: (bill: %f, tip: %s, npeople: %i, expected tip: %f, expect total: %f',
    (bill, tip, people, expectedTip, expectedTotal) => {
      render(<Calculator />);
      const billInput = screen.getByLabelText(/bill/i);

      const peopleInput = screen.getByLabelText(/number of people/i);
      fireEvent.change(billInput, { target: { value: bill.toString() } });

      fireEvent.change(peopleInput, { target: { value: people.toString() } });

      const tipInInteger = Number(tip.replace('%', ''));
      if ([5, 10, 15, 25, 50].indexOf(tipInInteger) !== -1) {
        const radioButton = screen.getByLabelText(tip);
        fireEvent.click(radioButton);
      } else {
        const customInput = screen.getByLabelText('custom value');
        fireEvent.change(customInput, {
          target: { value: tipInInteger.toString() },
        });
      }

      const tipOutput = screen.getByLabelText(/tip amount/i);
      expect(tipOutput).toHaveTextContent('$' + expectedTip.toString());

      const totalOutput = screen.getByLabelText(/total/i);
      expect(totalOutput).toHaveTextContent('$' + expectedTotal.toString());
    }
  );
});
