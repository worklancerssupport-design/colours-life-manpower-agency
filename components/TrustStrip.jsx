import { Users, ShieldCheck, Clock, BadgeCheck } from 'lucide-react';
import agencyInfo from '@/data/agency.json';
import { getAllServices } from '@/lib/services';

const stats = [
  {
    icon: Users,
    value: `${getAllServices().length} services`,
    label: agencyInfo.about,
  },
  {
    icon: BadgeCheck,
    value: agencyInfo.claims.idCheckVerified,
    label: agencyInfo.claims.idCheckLong,
  },
  {
    icon: ShieldCheck,
    value: agencyInfo.claims.founderDirect,
    label: agencyInfo.claims.founderDirectLong,
  },
  {
    icon: Clock,
    value: agencyInfo.claims.placementSpeed,
    label: agencyInfo.claims.placementSpeedLong,
  },
];

export default function TrustStrip() {
  return (
    <section className="trust-strip" aria-label={`Why families trust ${agencyInfo.name}`}>
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
