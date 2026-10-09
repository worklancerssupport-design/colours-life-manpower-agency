export default function BeforeYouDecide({ qas = [] }) {
  if (!qas.length) return null;

  return (
    <section className="section-light decide-section">
      <div className="container">
        <div className="decide-intro">
          <h2 className="section-heading">Before you decide</h2>
          <p className="section-subline">
            The questions worth asking before anyone starts in your home — answered here, so nothing catches you off guard later.
          </p>
        </div>

        <div className="unasked-grid">
          {qas.map((qa, i) => (
            <div key={i} className="unasked-card">
              <h3 className="unasked-q">{qa.question}</h3>
              <p className="unasked-a">{qa.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
