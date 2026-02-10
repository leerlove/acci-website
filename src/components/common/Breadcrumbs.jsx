import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { getBreadcrumbs } from '../../data/navigation';

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const crumbs = getBreadcrumbs(pathname);

  if (crumbs.length <= 1) return null;

  return (
    <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-sm">
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        return (
          <span key={crumb.path} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-white/40" />}
            {index === 0 ? (
              <Link to={crumb.path} className="text-white/60 hover:text-white transition-colors">
                <Home className="w-3.5 h-3.5" />
              </Link>
            ) : isLast ? (
              <span className="text-white font-medium">{crumb.name}</span>
            ) : (
              <Link to={crumb.path} className="text-white/60 hover:text-white transition-colors">
                {crumb.name}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
