import Link from 'next/link';
import servicesData from '@/data/services.json';

export default function ServicesTicker() {
  return (
    <div className="services-strip" aria-label="Services offered by Colours Life Manpower Agency">
      <div className="container services-strip-inner">
        <ul className="services-strip-chips" role="list">
          {servicesData.map((svc) => (
            <li key={svc.id} className="services-strip-item">
              <Link
                href={svc.path}
                className="services-strip-chip"
                title={`Explore ${svc.navTitle} in Chennai`}
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