import { Check, Minus, AlertTriangle } from 'lucide-react';

export default function ScopeSplit({ title, included = [], excluded = [], note }) {
  if (!included.length && !excluded.length) return null;

  return (
    <section className="section-light scope-section">
      <div className="container">
        <h2 className="section-heading scope-heading">{title}</h2>

        <div className="scope-grid">
          <div className="scope-col scope-col-in">
            <h3 className="scope-col-title">
              <span className="scope-col-mark scope-col-mark-in" aria-hidden="true">
                <Check size={13} strokeWidth={3} />
              </span>
              Handled for you
            </h3>
            <ul className="scope-list">
              {included.map((item, i) => (
                <li key={i} className="scope-item">
                  <span className="scope-item-icon" aria-hidden="true">
                    <Check size={15} strokeWidth={2.5} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="scope-col scope-col-out">
            <h3 className="scope-col-title">
              <span className="scope-col-mark scope-col-mark-out" aria-hidden="true">
                <Minus size={13} strokeWidth={3} />
              </span>
              You arrange
            </h3>
            <ul className="scope-list">
              {excluded.map((item, i) => (
                <li key={i} className="scope-item">
                  <span className="scope-item-icon" aria-hidden="true">
                    <Minus size={15} strokeWidth={2.5} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {note && (
          <p className="scope-note">
            <AlertTriangle size={15} aria-hidden="true" />
            <span>{note}</span>
          </p>
        )}
      </div>
    </section>
  );
}
