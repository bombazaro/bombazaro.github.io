export default function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="marquee" aria-hidden="true">
      <div>
        {loop.map((item, i) => (
          <span key={`${item}-${i}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
