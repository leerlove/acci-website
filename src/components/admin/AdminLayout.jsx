import { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard,
  MessageSquare,
  Mail,
  Newspaper,
  Image,
  Users,
  UserPlus,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/admin/dashboard', label: '대시보드', icon: LayoutDashboard },
  { to: '/admin/inquiries', label: '문의 관리', icon: MessageSquare },
  { to: '/admin/newsletter', label: '뉴스레터', icon: Mail },
  { to: '/admin/news', label: '소식 관리', icon: Newspaper },
  { to: '/admin/gallery', label: '갤러리', icon: Image },
  { to: '/admin/executives', label: '임원 관리', icon: Users },
  { to: '/admin/members', label: '회원 신청', icon: UserPlus },
];

const BRAND_COLOR = '#6B2D4A';

const SidebarContent = ({ onClose, user, handleSignOut }) => (
  <div className="flex flex-col h-full">
    {/* 사이드바 헤더 */}
    <div
      className="flex items-center justify-between px-5 py-4 border-b border-white/10"
      style={{ backgroundColor: BRAND_COLOR }}
    >
      <span className="text-white font-bold text-lg tracking-tight">KACCI 관리자</span>
      {onClose && (
        <button onClick={onClose} className="text-white/70 hover:text-white transition md:hidden">
          <X className="w-5 h-5" />
        </button>
      )}
    </div>

    {/* 네비게이션 */}
    <nav className="flex-1 py-4 overflow-y-auto" style={{ backgroundColor: BRAND_COLOR }}>
      <ul className="space-y-1 px-3">
        {/* eslint-disable-next-line no-unused-vars */}
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/admin/dashboard'}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* 구분선 */}
      <div className="mx-4 my-3 border-t border-white/10" />

      <ul className="space-y-1 px-3">
        <li>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition"
          >
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
            사이트 보기
          </Link>
        </li>
        <li>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            로그아웃
          </button>
        </li>
      </ul>
    </nav>

    {/* 사용자 정보 */}
    <div
      className="px-4 py-3 border-t border-white/10 text-xs text-white/50 truncate"
      style={{ backgroundColor: BRAND_COLOR }}
    >
      {user?.email}
    </div>
  </div>
);

const AdminLayout = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* 데스크탑 사이드바 */}
      <aside className="hidden md:flex flex-col w-60 flex-shrink-0 shadow-lg">
        <SidebarContent user={user} handleSignOut={handleSignOut} />
      </aside>

      {/* 모바일 오버레이 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 모바일 사이드바 */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 flex flex-col shadow-xl transition-transform duration-300 md:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent
          user={user}
          handleSignOut={handleSignOut}
          onClose={() => setSidebarOpen(false)}
        />
      </aside>

      {/* 메인 콘텐츠 영역 */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* 상단 헤더 바 */}
        <header className="flex items-center gap-4 px-4 py-3 bg-white shadow-sm flex-shrink-0">
          {/* 모바일 햄버거 */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition"
          >
            <Menu className="w-5 h-5" />
          </button>

          <span className="font-semibold text-gray-800 text-sm md:text-base">KACCI 관리자</span>

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden sm:block text-sm text-gray-500 truncate max-w-[200px]">
              {user?.email}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">로그아웃</span>
            </button>
          </div>
        </header>

        {/* 페이지 콘텐츠 */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
