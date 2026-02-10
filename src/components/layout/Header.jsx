import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { navigation } from '../../data/navigation';
import Logo from '../common/Logo';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    return () => {
      setIsMobileMenuOpen(false);
    };
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.children ? item.children[0].path : item.path}
                  className={`nav-link flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-primary-50 ${
                    location.pathname.startsWith(item.path) ? 'nav-link-active' : ''
                  }`}
                >
                  {item.name}
                  {item.children && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2 min-w-[180px]">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-fade-in">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) =>
                            `block px-4 py-2.5 text-sm transition-colors ${
                              isActive
                                ? 'bg-primary-50 text-primary font-medium'
                                : 'text-gray-700 hover:bg-primary-50 hover:text-primary'
                            }`
                          }
                        >
                          {child.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/membership/guide" className="btn-primary text-sm">
              회원가입
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 animate-slide-up">
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.children ? item.children[0].path : item.path}
                    className="block px-4 py-3 text-gray-700 font-medium hover:bg-primary-50 hover:text-primary rounded-lg"
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-6 mt-1 mb-2 border-l-2 border-primary-100 ml-4">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) =>
                            `block px-4 py-2 text-sm ${
                              isActive ? 'text-primary font-medium' : 'text-gray-600 hover:text-primary'
                            }`
                          }
                        >
                          {child.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-4 px-4">
              <Link to="/membership/guide" className="btn-primary w-full justify-center">
                회원가입
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
