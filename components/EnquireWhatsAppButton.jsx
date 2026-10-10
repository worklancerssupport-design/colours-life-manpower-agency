'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, X } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

function extractPlaceholders(template) {
  if (!template) return [];
  const seen = new Set();
  const out = [];
  const re = /\[([^\]]+)\]/g;
  let m;
  while ((m = re.exec(template)) !== null) {
    const key = m[1].trim();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(key);
    }
  }
  return out;
}

const FIELD_META = {
  'your area': {
    label: 'Your Area / Locality',
    hint: 'e.g., Adyar, Velachery',
  },
  'morning/evening shift': {
    label: 'Preferred Shift',
    hint: 'e.g., morning or evening',
  },
  hours: {
    label: 'Hours Per Day',
    hint: 'e.g., 2, 4, 8',
  },
  month: {
    label: 'Start Month',
    hint: 'e.g., March 2026',
  },
  age: {
    label: "Child's Age",
    hint: 'e.g., 6 months, 2 years',
  },
  'full-day/part-time': {
    label: 'Schedule Type',
    hint: 'full-day or part-time',
  },
  'my father / my mother, age': {
    label: "Elder's Age",
    hint: 'e.g., my father, 72',
  },
  'day shift/live-in': {
    label: 'Shift Type',
    hint: 'day shift or live-in',
  },
  'part-time/full-time/live-in': {
    label: 'Schedule Type',
    hint: 'part-time / full-time / live-in',
  },
  'daily / festival days': {
    label: 'Cooking Frequency',
    hint: 'daily or festival days',
  },
  'Iyer / Iyengar style': {
    label: 'Brahmin Cooking Style',
    hint: 'Iyer or Iyengar',
  },
  'day/night/live-in': {
    label: 'Shift Type',
    hint: 'day / night / live-in',
  },
  date: {
    label: 'Required Start Date',
    hint: 'e.g., 15 March 2026',
  },
  'daily office run / full-time / outstation': {
    label: 'Driving Requirement',
    hint: 'daily office / full-time / outstation',
  },
};

function getFieldMeta(placeholder) {
  const t = placeholder.trim();
  if (FIELD_META[t]) return FIELD_META[t];
  return {
    label: t.charAt(0).toUpperCase() + t.slice(1),
    hint: t,
  };
}

export default function EnquireWhatsAppButton({
  template,
  className = 'btn btn-whatsapp btn-sm',
  children,
  ariaLabel,
  title,
}) {
  const placeholders = useMemo(() => extractPlaceholders(template), [template]);
  const hasFields = placeholders.length > 0;

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({});
  const [mounted, setMounted] = useState(false);
  const firstInputRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      setValues((prev) => {
        const next = {};
        for (const p of placeholders) next[p] = prev[p] || '';
        return next;
      });
    }
  }, [open, placeholders]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (open && firstInputRef.current) firstInputRef.current.focus();
  }, [open]);

  const handleClick = (e) => {
    e.preventDefault();
    if (!hasFields) {
      window.open(getWhatsAppUrl(template), '_blank', 'noopener,noreferrer');
      return;
    }
    setOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filled = template.replace(/\[([^\]]+)\]/g, (_, key) => {
      const v = (values[key.trim()] || '').trim();
      return v || `[${key}]`;
    });
    window.open(getWhatsAppUrl(filled), '_blank', 'noopener,noreferrer');
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={className}
        title={title}
        aria-label={ariaLabel}
      >
        <MessageCircle size={14} /> {children}
      </button>

      {mounted && open && hasFields && createPortal(
        <div
          className="enquire-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="enquire-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="enquire-modal">
            <button
              type="button"
              className="enquire-close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="enquire-header">
              <span className="enquire-eyebrow">A few quick details</span>
              <h3 id="enquire-title" className="enquire-title">
                Tell us what you need
              </h3>
              <p className="enquire-sub">
                Fill these in and we&apos;ll prefill your WhatsApp message.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="enquire-form">
              {placeholders.map((p, i) => {
                const meta = getFieldMeta(p);
                return (
                <div key={p} className="enquire-field">
                  <label htmlFor={`enquire-${i}`} className="enquire-label">
                    {meta.label}
                  </label>
                  <input
                    id={`enquire-${i}`}
                    ref={i === 0 ? firstInputRef : null}
                    type="text"
                    className="enquire-input"
                    value={values[p] || ''}
                    onChange={(e) =>
                      setValues((prev) => ({ ...prev, [p]: e.target.value }))
                    }
                    placeholder={meta.hint}
                    required
                  />
                </div>
                );
              })}

              <div className="enquire-actions">
                <button
                  type="button"
                  className="enquire-cancel"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="enquire-submit">
                  <MessageCircle size={15} /> Send on WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      , document.body)}
    </>
  );
}
