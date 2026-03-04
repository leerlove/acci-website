import { Link } from 'react-router-dom';

const Logo = ({ variant = 'default' }) => {
  const isFooter = variant === 'footer';

  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="w-10 h-10 flex-shrink-0 overflow-hidden">
        <img
          src="/images/logo-icon.png"
          alt="한국반려문화산업학회 로고"
          className={`h-full object-cover object-left ${isFooter ? 'brightness-0 invert opacity-80' : ''}`}
        />
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
