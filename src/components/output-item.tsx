export default function OutputItem({ title }: { title: string }) {
  const id =
    'output-' +
    title
      .split(' ')
      .map((x) => x.toLowerCase().trim())
      .join('-');

  return (
    <div className="item">
      <label className="label" htmlFor={id}>
        <p className="title">Tip Amount</p>
        <p className="person">/person</p>
      </label>
      <output
        id={id}
        htmlFor="bill rp-5 rp-10 rp-15 rp-25 rp-50 rp-custom npeople"
        className="value"
      ></output>
    </div>
  );
}
