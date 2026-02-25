import { useState, useEffect } from 'react';
import { MessageSquare, AlertCircle, Mail, Newspaper, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalInquiries: 0,
    unreadInquiries: 0,
    subscriberCount: 0,
    newsCount: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [recentSubscribers, setRecentSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setLoading(true);
    setError(null);
    try {
      const [
        { count: totalInquiries },
        { count: unreadInquiries },
        { count: subscriberCount },
        { data: inquiries },
        { data: subscribers },
      ] = await Promise.all([
        supabase.from('contact_inquiries').select('*', { count: 'exact', head: true }),
        supabase.from('contact_inquiries').select('*', { count: 'exact', head: true }).eq('is_read', false),
        supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('contact_inquiries').select('id,category,name,email,subject,is_read,created_at').order('created_at', { ascending: false }).limit(5),
        supabase.from('newsletter_subscribers').select('id,email,is_active,subscribed_at').order('subscribed_at', { ascending: false }).limit(5),
      ]);

      let newsCount = 0;
      try {
        const { count } = await supabase.from('news').select('*', { count: 'exact', head: true }).eq('is_published', true);
        newsCount = count ?? 0;
      } catch {
        // news 테이블이 없을 수 있으므로 에러 무시
      }

      setStats({
        totalInquiries: totalInquiries ?? 0,
        unreadInquiries: unreadInquiries ?? 0,
        subscriberCount: subscriberCount ?? 0,
        newsCount,
      });
      setRecentInquiries(inquiries ?? []);
      setRecentSubscribers(subscribers ?? []);
    } catch (err) {
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  const statCards = [
    {
      label: '총 문의 수',
      value: stats.totalInquiries,
      icon: MessageSquare,
      iconBg: 'bg-primary-100',
      iconColor: 'text-primary-800',
    },
    {
      label: '읽지 않은 문의',
      value: stats.unreadInquiries,
      icon: AlertCircle,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
    },
    {
      label: '뉴스레터 구독자',
      value: stats.subscriberCount,
      icon: Mail,
      iconBg: 'bg-secondary-light/40',
      iconColor: 'text-secondary-dark',
    },
    {
      label: '게시된 소식',
      value: stats.newsCount,
      icon: Newspaper,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary-800" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* 헤더 */}
      <div>
        <p className="text-sm text-gray-500 mb-1">{today}</p>
        <h1 className="text-2xl font-bold text-gray-900">관리자 대시보드</h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${card.iconBg}`}>
                <Icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value.toLocaleString()}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 최근 문의 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">최근 문의</h2>
        </div>
        {recentInquiries.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">문의가 없습니다.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">상태</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">카테고리</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">제목</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">이름</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">날짜</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((item) => (
                  <tr key={item.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-6 py-3">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${item.is_read ? 'bg-gray-300' : 'bg-red-500'}`}
                      />
                    </td>
                    <td className="px-6 py-3 text-gray-600">{item.category}</td>
                    <td className="px-6 py-3 text-gray-800 max-w-xs truncate">{item.subject}</td>
                    <td className="px-6 py-3 text-gray-600">{item.name}</td>
                    <td className="px-6 py-3 text-gray-500">
                      {new Date(item.created_at).toLocaleDateString('ko-KR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 최근 뉴스레터 구독자 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">최근 뉴스레터 구독자</h2>
        </div>
        {recentSubscribers.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">구독자가 없습니다.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">이메일</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">상태</th>
                  <th className="text-left px-6 py-3 text-gray-500 font-medium">구독일</th>
                </tr>
              </thead>
              <tbody>
                {recentSubscribers.map((sub) => (
                  <tr key={sub.id} className="border-b border-gray-50 last:border-0">
                    <td className="px-6 py-3 text-gray-800">{sub.email}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          sub.is_active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        {sub.is_active ? '활성' : '비활성'}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-500">
                      {new Date(sub.subscribed_at).toLocaleDateString('ko-KR')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
