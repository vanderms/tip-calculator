interface Props {
  value: string;
  checked: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioItem({ value, checked, onChange }: Props) {
  const id = `rp-${value}`;
  return (
    <div className="radio-item">
      <input
        type="radio"
        name="percentage"
        id={id}
        value={value}
        checked={value === checked}
        onChange={onChange}
      />
      <label htmlFor={id}>{value}%</label>
    </div>
  );
}
