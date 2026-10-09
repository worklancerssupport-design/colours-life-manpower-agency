export default function ShiftCards({ title, options = [] }) {
  if (!options.length) return null;

  return (
    <section className="section-light shift-section">
      <div className="container">
        <h2 className="section-heading">{title}</h2>

        <div className="shift-cards">
          {options.map((opt, i) => (
            <article key={i} className="shift-card">
              <div className="shift-card-type">{opt.type}</div>
              <div className="shift-card-hours">{opt.hours}</div>
              <p className="shift-card-desc">{opt.description}</p>
              {opt.bestFor && (
                <div className="shift-card-best">
                  <span className="shift-card-best-label">Best for</span>
                  <span>{opt.bestFor}</span>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
