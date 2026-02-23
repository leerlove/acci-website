import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import Logo from '../common/Logo';

const Footer = () => {
  const footerLinks = [
    {
      title: '학회소개',
      links: [
        { name: '인사말', path: '/about/greeting' },
        { name: '설립목적 및 비전', path: '/about/purpose' },
        { name: '조직도', path: '/about/organization' },
        { name: '정관', path: '/about/bylaws' },
      ],
    },
    {
      title: '학술활동',
      links: [
        { name: '학술대회', path: '/academic/conference' },
        { name: '연구발표회', path: '/academic/presentation' },
        { name: '정책간담회', path: '/academic/policy' },
      ],
    },
    {
      title: '학회지 <반려문화>',
      links: [
        { name: '투고안내', path: '/journal/submission' },
        { name: '논문검색', path: '/journal/search' },
        { name: '연구윤리규정', path: '/journal/ethics' },
      ],
    },
    {
      title: '회원',
      links: [
        { name: '회원가입 안내', path: '/membership/guide' },
        { name: '회원혜택', path: '/membership/benefits' },
        { name: '회비안내', path: '/membership/fee' },
      ],
    },
  ];

  return (
    <footer className="bg-primary-900">
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Logo & Contact Info */}
          <div className="lg:col-span-2">
            <Logo variant="footer" />
            <p className="mt-6 text-white/70 text-sm leading-relaxed max-w-md">
              반려시민윤리로 여는 평화적 공존의 시대,<br />
              지속 가능한 반려산업의 미래를 연구합니다.
            </p>

            <div className="mt-8 space-y-3">
              <div className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  서울특별시 동대문구 경희대로 26,<br />
                  경희대학교 네오르네상스관 332호
                </span>
              </div>
              <div className="flex items-center gap-3 text-white/70 text-sm">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>02-961-0481</span>
              </div>
              <div className="flex items-center gap-3 text-white/70 text-sm">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>contact@kacci.or.kr</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-white/60 text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-semibold mb-1">뉴스레터 구독</h4>
              <p className="text-white/60 text-sm">학회 소식과 학술 정보를 받아보세요.</p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="이메일 주소"
                className="px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-secondary w-64"
              />
              <button className="px-6 py-2.5 bg-secondary text-white font-medium rounded-lg hover:bg-secondary-dark transition-colors">
                구독
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              © 2026 한국반려문화산업학회. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-white/50 text-sm hover:text-white transition-colors">
                개인정보처리방침
              </Link>
              <Link to="/terms" className="text-white/50 text-sm hover:text-white transition-colors">
                이용약관
              </Link>
              <Link to="/sitemap" className="text-white/50 text-sm hover:text-white transition-colors">
                사이트맵
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
