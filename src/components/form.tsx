import RadioItem from './radio-item';
import OutputItem from './output-item';

export default function Form() {
  return (
    <form className="nv-form">
      <div className="bill-input-container">
        <label htmlFor="bill">Bill</label>
        <input type="number" name="bill" id="bill" />
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
        <p className="error-message">Can't be zero</p>
        <input type="number" name="npeople" id="npeople"  />       
      </div>
      <div className="nv-visor">
        <OutputItem title="Tip Amount" />
        <OutputItem title="Total" />
      </div>
      <input type="reset" value="RESET"/>
    </form>
  );
}
