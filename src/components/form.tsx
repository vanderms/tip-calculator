import RadioItem from './radio-item';
import OutputItem from './output-item';
import { useState } from 'react';

function calcTip(bill: number, tip: number, npeople: number): number {
  return npeople ? (bill * tip) / npeople : 0;
}

function calcTotal(bill: number, tip: number, npeople: number): number {
  return npeople ? (bill * (tip + 1)) / npeople : 0;
}

export default function Form() {
  const [bill, setBill] = useState<string>('0');
  const [people, setPeople] = useState<string>('1');
  const [tip, setTip] = useState<number>(0);
  const [checked, setChecked] = useState<string>('');

  
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
        <RadioItem value="5" />
        <RadioItem value="10" />
        <RadioItem value="15" />
        <RadioItem value="25" />
        <RadioItem value="50" />
        <div className="radio-item" data-type="custom">
          <input type="radio" name="percentage" id="rp-custom" value="" />
          <label htmlFor="rp-custom">Custom</label>
          <input type="number" aria-label="custom value" />
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
        <OutputItem title="Tip Amount" value={calcTip(+bill, tip, +people)} />
        <OutputItem title="Total" value={calcTotal(+bill, tip, +people)} />
      </div>
      <input type="reset" value="RESET" />
    </form>
  );
}
