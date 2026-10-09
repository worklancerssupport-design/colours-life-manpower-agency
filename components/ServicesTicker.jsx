import Link from 'next/link';
import agencyInfo from '@/data/agency.json';
import { getAllServices } from '@/lib/services';

export default function ServicesTicker() {
  return (
    <div className="services-strip" aria-label={`Services offered by ${agencyInfo.name}`}>
      <div className="container services-strip-inner">
        <ul className="services-strip-chips" role="list">
          {getAllServices().map((svc) => (
            <li key={svc.id} className="services-strip-item">
              <Link
                href={svc.path}
                className="services-strip-chip"
                title={`Explore ${svc.navTitle} in ${agencyInfo.address.city}`}
              >
                {svc.shortName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
