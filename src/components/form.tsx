import RadioItem from './radio-item';
import OutputItem from './output-item';
import { useState, useRef } from 'react';

export default function Form() {
  const [bill, setBill] = useState<string>('0');
  const [people, setPeople] = useState<string>('1');
  const [tip, setTip] = useState<number>(0);
  const [customValue, setCustomValue] = useState<string>('');
  const [checked, setChecked] = useState<string>('');

  const customInput = useRef<HTMLInputElement | null>(null);

  function handleRadioChange(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked(e.currentTarget.value);
    if (e.currentTarget.value !== 'custom') {
      setTip(+e.currentTarget.value);
      setCustomValue('');
    } else {
      setTip(+customValue / 100);
    }
  }

  function reset() {
    setBill('0');
    setPeople('1');
    setTip(0);
    setCustomValue('Custom');
    setChecked('');
  }

  const tipAmount: number = +people ? (+bill * (tip / 100)) / +people : 0;
  const total: number = +people ? (+bill * (tip / 100 + 1)) / +people : 0;

  return (
    <form className="nv-form">
      <div className="bill-input-container">
        <label htmlFor="bill">Bill</label>
        <input
          type="number"
          name="bill"
          id="bill"
          onChange={(e) => setBill(e.currentTarget.value)}
          value={bill}
        />
      </div>
      <div className="radio-container">
        <p>Select Tip %</p>
        <RadioItem value="5" checked={checked} onChange={handleRadioChange} />
        <RadioItem value="10" checked={checked} onChange={handleRadioChange} />
        <RadioItem value="15" checked={checked} onChange={handleRadioChange} />
        <RadioItem value="25" checked={checked} onChange={handleRadioChange} />
        <RadioItem value="50" checked={checked} onChange={handleRadioChange} />
        <div className="radio-item" data-type="custom">
          <input
            type="radio"
            name="percentage"
            id="rp-custom"
            value="custom"
            onChange={(e) => {
              handleRadioChange(e);
              setCustomValue('0');
              customInput.current?.focus();
            }}
            checked={'custom' === checked}
          />
          <label htmlFor="rp-custom">Custom</label>
          <input
            type="number"
            placeholder="Custom"
            ref={customInput}
            value={customValue}
            onChange={(e) => {
              setChecked('custom');
              setCustomValue(e.currentTarget.value);
            }}
            aria-label="custom value"
          />
        </div>
      </div>
      <div className="npeople-input-container">
        <label htmlFor="npeople">Number of People</label>
        {people === '0' && <p className="error-message">Can't be zero</p>}
        <input
          type="number"
          name="npeople"
          id="npeople"
          value={people}
          onChange={(e) => {
            setPeople(e.currentTarget.value);
          }}
        />
      </div>
      <div className="nv-visor">
        <OutputItem title="Tip Amount" value={tipAmount} />
        <OutputItem title="Total" value={total} />
      </div>
      <input type="reset" value="RESET" onClick={reset} />
    </form>
  );
}
