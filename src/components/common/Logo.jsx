import { User, Leaf, PawPrint } from 'lucide-react';
import { Link } from 'react-router-dom';

const Logo = ({ variant = 'default' }) => {
  const isFooter = variant === 'footer';

  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="flex items-center">
        <div className="grid grid-cols-2 gap-0.5">
          <User
            className={`w-4 h-4 ${isFooter ? 'text-white/80' : 'text-primary'}`}
            strokeWidth={2.5}
          />
          <PawPrint
            className={`w-4 h-4 ${isFooter ? 'text-secondary-light' : 'text-secondary'}`}
            strokeWidth={2.5}
          />
          <Leaf
            className={`w-4 h-4 ${isFooter ? 'text-white/60' : 'text-primary-600'}`}
            strokeWidth={2.5}
          />
          <User
            className={`w-4 h-4 ${isFooter ? 'text-secondary-light' : 'text-secondary'}`}
            strokeWidth={2.5}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <span className={`text-lg font-bold leading-tight ${isFooter ? 'text-white' : 'text-primary'}`}>
          한국반려문화산업학회
        </span>
        <span className={`text-[10px] tracking-tight ${
          isFooter ? 'text-white/60' : 'text-gray-500 hidden sm:block'
        }`}>
          Korean Association of Companion Culture and Industry
        </span>
      </div>
    </Link>
  );
};

export default Logo;
