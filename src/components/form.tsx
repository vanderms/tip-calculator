import RadioItem from './radio-item';
import OutputItem from './output-item';
import { useState, useRef } from 'react';
import IconDollarURL from '../assets/icon-dollar.svg';
import IconPersonURL from '../assets/icon-person.svg';

function calcTip(bill: number, tip: number, npeople: number) {
  if (npeople === 0) {
    return { tipAmount: 0, total: 0 };
  }
  const totalTipInCents = Math.floor(bill * tip);
  const tipPerPersonInCents = Math.floor(totalTipInCents / npeople);
  const tipAmount = tipPerPersonInCents / 100;
  const totalWithouTip = Math.floor((bill * 100) / npeople) / 100;
  const total = totalWithouTip + tipAmount;
  return { tipAmount, total };
}

export default function Form() {
  const [bill, setBill] = useState<string>('');
  const [people, setPeople] = useState<string>('');
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
    setBill('');
    setPeople('');
    setTip(0);
    setCustomValue('');
    setChecked('');
  }

  function isDisabled(): boolean {
    return bill === '' && people === '' && customValue === '' && checked === '';
  }

  const { tipAmount, total } = calcTip(+bill, tip, +people);

  return (
    <form className="form">
      <div className="bill-input-container">
        <label className="label" htmlFor="bill">
          Bill
        </label>
        <input
          className="input"
          type="number"
          name="bill"
          id="bill"
          placeholder="0"
          onChange={(e) => setBill(e.currentTarget.value)}
          value={bill}
        />
        <img src={IconDollarURL} className="input-icon" alt="" />
      </div>
      <div className="radio-container">
        <p className="label">Select Tip %</p>
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
          <label className="label" htmlFor="rp-custom">
            Custom
          </label>
        </div>
        <input
          type="number"
          placeholder="Custom"
          className="input"
          data-type="custom"
          ref={customInput}
          value={customValue}
          onChange={(e) => {
            setChecked('custom');
            setCustomValue(e.currentTarget.value);
            setTip(+e.currentTarget.value);
          }}
          aria-label="custom value"
        />
      </div>
      <div className="npeople-input-container">
        <label className="label" htmlFor="npeople">
          Number of People
        </label>
        {people === '0' && <p className="error-message">Can't be zero</p>}

        <input
          type="number"
          name="npeople"
          className="input"
          placeholder="0"
          id="npeople"
          value={people}
          onChange={(e) => {
            setPeople(e.currentTarget.value);
          }}
        />
        <img src={IconPersonURL} className="input-icon" alt="" />
      </div>
      <div className="visor">
        <OutputItem title="Tip Amount" value={tipAmount} />
        <OutputItem title="Total" value={total} />
        <input
          className="reset"
          type="reset"
          value="RESET"
          onClick={reset}
          disabled={isDisabled()}
        />
      </div>
    </form>
  );
}
