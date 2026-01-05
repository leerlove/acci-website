import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, User, Leaf, PawPrint } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    {
      name: '학회소개',
      href: '#about',
      children: [
        { name: '인사말', href: '#greeting' },
        { name: '설립목적 및 비전', href: '#purpose' },
        { name: '연혁', href: '#history' },
        { name: '조직도', href: '#organization' },
        { name: '정관', href: '#bylaws' },
        { name: '오시는 길', href: '#location' },
      ],
    },
    {
      name: '학술활동',
      href: '#academic',
      children: [
        { name: '학술대회', href: '#conference' },
        { name: '연구발표회', href: '#presentation' },
        { name: '정책간담회', href: '#policy' },
      ],
    },
    {
      name: '학회지',
      href: '#journal',
      children: [
        { name: '투고안내', href: '#submission' },
        { name: '논문검색', href: '#search' },
        { name: '연구윤리규정', href: '#ethics' },
      ],
    },
    {
      name: '소식',
      href: '#news',
      children: [
        { name: '공지사항', href: '#notice' },
        { name: '학회소식', href: '#news-list' },
        { name: '보도자료', href: '#press' },
      ],
    },
    {
      name: '회원',
      href: '#membership',
      children: [
        { name: '회원가입 안내', href: '#join' },
        { name: '회원혜택', href: '#benefits' },
        { name: '회비안내', href: '#fee' },
      ],
    },
    { name: '문의', href: '#contact' },
  ];

  const Logo = () => (
    <a href="#" className="flex items-center gap-3 group">
      {/* 로고 심볼 - 공존 테마 */}
      <div className="flex items-center">
        <div className="grid grid-cols-2 gap-0.5">
          <User className="w-4 h-4 text-primary" strokeWidth={2.5} />
          <PawPrint className="w-4 h-4 text-secondary" strokeWidth={2.5} />
          <Leaf className="w-4 h-4 text-primary-600" strokeWidth={2.5} />
          <User className="w-4 h-4 text-secondary" strokeWidth={2.5} />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold text-primary leading-tight">
          한국반려문화산업학회
        </span>
        <span className="text-[10px] text-gray-500 tracking-tight hidden sm:block">
          Korean Association of Companion Culture and Industry
        </span>
      </div>
    </a>
  );

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
                <a
                  href={item.href}
                  className="nav-link flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-primary-50"
                >
                  {item.name}
                  {item.children && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${
                      activeDropdown === item.name ? 'rotate-180' : ''
                    }`} />
                  )}
                </a>

                {/* Dropdown Menu */}
                {item.children && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2 min-w-[180px]">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 py-2 animate-fade-in">
                      {item.children.map((child) => (
                        <a
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary transition-colors"
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#membership" className="btn-primary text-sm">
              회원가입
            </a>
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
                  <a
                    href={item.href}
                    className="block px-4 py-3 text-gray-700 font-medium hover:bg-primary-50 hover:text-primary rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                  {item.children && (
                    <div className="pl-6 mt-1 mb-2 border-l-2 border-primary-100 ml-4">
                      {item.children.map((child) => (
                        <a
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-primary"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-4 px-4">
              <a href="#membership" className="btn-primary w-full justify-center">
                회원가입
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
