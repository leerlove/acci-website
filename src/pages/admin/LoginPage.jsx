import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2, LogIn } from 'lucide-react';

const LoginPage = () => {
  const { user, loading, signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // 이미 로그인 상태면 대시보드로 리다이렉트
  if (!loading && user) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      setSubmitting(false);
    } else {
      navigate('/admin/dashboard', { replace: true });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* 로고 / 학회명 */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
            style={{ backgroundColor: '#6B2D4A' }}
          >
            <span className="text-white text-2xl font-bold">K</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">한국반려문화산업학회</h1>
          <p className="text-sm text-gray-500 mt-1">관리자 시스템</p>
        </div>

        {/* 로그인 카드 */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">관리자 로그인</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@example.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent transition"
                style={{ '--tw-ring-color': '#6B2D4A' }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #6B2D4A'}
                onBlur={(e) => e.target.style.boxShadow = ''}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none transition"
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #6B2D4A'}
                onBlur={(e) => e.target.style.boxShadow = ''}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-white text-sm font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#6B2D4A' }}
              onMouseEnter={(e) => { if (!submitting) e.target.style.backgroundColor = '#5a2540'; }}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#6B2D4A'}
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {submitting ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2025 한국반려문화산업학회. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
