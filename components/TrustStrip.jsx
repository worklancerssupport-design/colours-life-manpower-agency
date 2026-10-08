import servicesData from '@/data/services.json';
import { Users, ShieldCheck, Clock, BadgeCheck } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: `${servicesData.length} services`,
    label: 'Cooks, nannies, attendants, maids and drivers — one roof.',
  },
  {
    icon: BadgeCheck,
    value: 'Aadhaar-verified',
    label: 'ID, residential background and references checked for every helper.',
  },
  {
    icon: ShieldCheck,
    value: 'Founder-direct',
    label: 'No IVR, no bots — you reach the owner directly on WhatsApp.',
  },
  {
    icon: Clock,
    value: 'Placed in days',
    label: 'Most placements confirmed within a week, not within a month.',
  },
];

export default function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Why families trust Colours Life">
      <div className="container">
        <div className="trust-strip-row">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div className="trust-strip-cell" key={stat.value}>
                <span className="trust-strip-icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <div>
                  <div className="trust-strip-value">{stat.value}</div>
                  <div className="trust-strip-label">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
