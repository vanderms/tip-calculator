interface Props {
  title: string;
  value: number;
}

export default function OutputItem({ title, value }: Props) {
  const id =
    'output-' +
    title
      .split(' ')
      .map((x) => x.toLowerCase().trim())
      .join('-');

  return (
    <div className="output-item">
      <label className="output-label" htmlFor={id}>
        <span className="title">{title}</span>
        <span className="person">/ person</span>
      </label>
      <output
        id={id}
        htmlFor="bill rp-5 rp-10 rp-15 rp-25 rp-50 rp-custom npeople"
        className="value"
      >
        {Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value)}
      </output>
    </div>
  );
}
