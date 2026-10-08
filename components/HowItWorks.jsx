import pagesData from '@/data/pages.json';

const { howItWorks } = pagesData.homePage;

export default function HowItWorks() {
  return (
    <section className="section-steps" id="how-it-works" aria-label="How it works">
      <div className="container">
        <div style={{ maxWidth: 720 }}>
          <span className="section-eyebrow">
            <span className="section-eyebrow-mark" />
            {howItWorks.eyebrow}
          </span>
          <h2 className="section-heading">
            {howItWorks.heading} <em>{howItWorks.headingEm}</em>
          </h2>
          <p className="section-subline">{howItWorks.subtext}</p>
        </div>

        <ol className="steps-row">
          {howItWorks.steps.map((step) => (
            <li className="step" key={step.number}>
              <span className="step-num" aria-hidden="true">{step.number}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
