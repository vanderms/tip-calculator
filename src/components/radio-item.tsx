export default function RadioItem({ value }: { value: string }) {
  const id = `rp-${value}`;
  return (
    <div className="radio-item">
      <input type="radio" name="percentage" id={id} value={value} />
      <label htmlFor={id}>{value}%</label>
    </div>
  );
}

