'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const days = [
  { num: '09', day: 'Sun' },
  { num: '10', day: 'Mon' },
  { num: '11', day: 'Wed' },
  { num: '12', day: 'Thu' },
  { num: '13', day: 'Fri' },
  { num: '14', day: 'Sat' },
];

const slots = ['10:00 AM', '9:30 AM', '8:00 AM', '9:00 AM', '8:30 AM', '9:30 AM'];

export default function AboutSection() {
  const [activeDay, setActiveDay] = useState(3);
  const [activeSlot, setActiveSlot] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="section-light" id="about">
      <div className="container">
        <div className="about-grid">
          <div>
            <span className="section-eyebrow">
              <span className="section-eyebrow-mark" />
              About Colours Life
            </span>
            <h2 className="section-heading">
              Where Helpers <em>Become Family.</em>
            </h2>
            <div className="about-lead">
              <p>
                For years the Colours Life family has been turning domestic placements into relationships. 6 verified reviews, 8 service categories, and one founder who answers his own phone — that is the entire agency.
              </p>
              <p>
                Every helper we place is Aadhaar-verified, locally referenced, and matched to your home's rhythm by Thomas R personally. No bots, no call centres.
              </p>
            </div>

            <div className="scheduler" aria-label="Schedule a placement call">
              <div className="scheduler-coach">
                <div className="scheduler-coach-avatar" aria-hidden="true">T</div>
                <div>
                  <div className="scheduler-coach-name">Thomas R</div>
                  <div className="scheduler-coach-role">Placement Coordinator · Colours Life</div>
                </div>
              </div>

              <div className="scheduler-tabs" role="tablist" aria-label="Schedule steps">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 0}
                  className={`scheduler-tab ${activeTab === 0 ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(0)}
                >
                  Schedule
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 1}
                  className={`scheduler-tab ${activeTab === 1 ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(1)}
                >
                  Call me back
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 2}
                  className={`scheduler-tab ${activeTab === 2 ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(2)}
                >
                  Walk-in
                </button>
              </div>

              <div className="scheduler-label">Pick a day</div>
              <div className="scheduler-dates" role="radiogroup" aria-label="Available dates">
                {days.map((d, i) => (
                  <button
                    key={d.num}
                    type="button"
                    role="radio"
                    aria-checked={activeDay === i}
                    className={`scheduler-date ${activeDay === i ? 'is-active' : ''}`}
                    onClick={() => setActiveDay(i)}
                  >
                    <span className="scheduler-date-num">{d.num}</span>
                    <span className="scheduler-date-day">{d.day}</span>
                  </button>
                ))}
              </div>

              <div className="scheduler-label">Pick a time</div>
              <div className="scheduler-slots" role="radiogroup" aria-label="Available time slots">
                {slots.map((s, i) => (
                  <button
                    key={s + i}
                    type="button"
                    role="radio"
                    aria-checked={activeSlot === i}
                    className={`scheduler-slot ${activeSlot === i ? 'is-active' : ''}`}
                    onClick={() => setActiveSlot(i)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="about-image-stack">
            <div className="about-image-primary">
              <Image
                src="/images/cooking-service-chennai.jpg"
                alt="A Colours Life home cook preparing a South Indian meal in a Chennai kitchen"
                fill
                sizes="(max-width: 992px) 100vw, 35vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="about-image-secondary">
              <div className="about-image-secondary-img">
                <Image
                  src="/images/newborn-baby-care-chennai.jpg"
                  alt="A newborn baby caretaker cradling a sleeping infant"
                  fill
                  sizes="(max-width: 992px) 100vw, 25vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="about-experience-card">
                <div className="about-experience-num">8+</div>
                <div className="about-experience-label">
                  Years of placing cooks, nannies and attendants into Chennai homes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}