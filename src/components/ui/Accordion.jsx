import { InfoTip } from "./InfoTip";

export function Accordion({ items }) {
  return (
    <div className="accordion-list">
      {items.map((item, index) => (
        <details className="accordion-item" key={item.title} open={index === 0}>
          <summary>
            <span>{item.title}</span>
            {item.info ? <InfoTip label={item.title}>{item.info}</InfoTip> : null}
          </summary>
          <div className="accordion-body">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
