import { useState, useEffect, useCallback } from 'react';
import { Mail, Download, Trash2, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const PAGE_SIZE = 20;

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [allSubscribers, setAllSubscribers] = useState([]);
  const [total, setTotal] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [tab, setTab] = useState('전체'); // '전체' | '활성' | '비활성'
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null); // id of row being actioned

  const fetchSubscribers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 전체 카운트 (통계용)
      const [{ count: totalCount }, { count: actCount }, { count: inactCount }] = await Promise.all([
        supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }),
        supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }).eq('is_active', false),
      ]);
      setTotal(totalCount ?? 0);
      setActiveCount(actCount ?? 0);
      setInactiveCount(inactCount ?? 0);

      // 페이지 목록
      let query = supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false })
        .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

      if (tab === '활성') query = query.eq('is_active', true);
      if (tab === '비활성') query = query.eq('is_active', false);

      const { data, error: err } = await query;
      if (err) throw err;
      setSubscribers(data ?? []);

      // CSV용 전체 활성 구독자 (페이지 무관)
      const { data: allActive } = await supabase
        .from('newsletter_subscribers')
        .select('email')
        .eq('is_active', true)
        .order('subscribed_at', { ascending: false });
      setAllSubscribers(allActive ?? []);
    } catch (err) {
      setError('구독자 목록을 불러오는 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, tab]);

  useEffect(() => {
    fetchSubscribers();
  }, [fetchSubscribers]);

  useEffect(() => {
    setPage(0);
  }, [tab]);

  async function toggleActive(sub) {
    setActionLoading(sub.id);
    try {
      const update = sub.is_active
        ? { is_active: false, unsubscribed_at: new Date().toISOString() }
        : { is_active: true, unsubscribed_at: null };
      const { error: err } = await supabase
        .from('newsletter_subscribers')
        .update(update)
        .eq('id', sub.id);
      if (err) throw err;
      fetchSubscribers();
    } catch (err) {
      alert('상태 변경 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  }

  async function deleteSub(id) {
    if (!window.confirm('이 구독자를 삭제하시겠습니까?')) return;
    setActionLoading(id);
    try {
      const { error: err } = await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('id', id);
      if (err) throw err;
      fetchSubscribers();
    } catch (err) {
      alert('삭제 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  }

  function downloadCSV() {
    const csv = allSubscribers.map((s) => s.email).join('\n');
    const blob = new Blob(['이메일\n' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  const displayTotal = tab === '전체' ? total : tab === '활성' ? activeCount : inactiveCount;
  const totalPages = Math.ceil(displayTotal / PAGE_SIZE);

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">뉴스레터 구독자 관리</h1>
          <p className="text-sm text-gray-500 mt-1">총 {total.toLocaleString()}명의 구독자</p>
        </div>
        <button
          onClick={downloadCSV}
          disabled={allSubscribers.length === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          활성 구독자 CSV 다운로드
        </button>
      </div>

      {/* 통계 카드 */}
      <div className="flex flex-wrap gap-4">
        {[
          { label: '총 구독자', value: total, bg: 'bg-gray-50', text: 'text-gray-800' },
          { label: '활성 구독자', value: activeCount, bg: 'bg-green-50', text: 'text-green-700' },
          { label: '비활성 구독자', value: inactiveCount, bg: 'bg-gray-50', text: 'text-gray-500' },
        ].map((card) => (
          <div
            key={card.label}
            className={`flex items-center gap-3 px-5 py-3 rounded-xl border border-gray-100 shadow-sm ${card.bg}`}
          >
            <Mail className={`w-5 h-5 ${card.text}`} />
            <div>
              <p className="text-xs text-gray-500">{card.label}</p>
              <p className={`text-xl font-bold ${card.text}`}>{card.value.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* 탭 필터 */}
      <div className="flex items-center gap-2">
        {['전체', '활성', '비활성'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              tab === t
                ? 'bg-primary-800 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* 테이블 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-6 h-6 animate-spin text-primary-800" />
          </div>
        ) : subscribers.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-12">구독자가 없습니다.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">이메일</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">상태</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium whitespace-nowrap">구독일</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium whitespace-nowrap">해지일</th>
                  <th className="text-right px-4 py-3 text-gray-500 font-medium">관리</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-800">{sub.email}</td>
                    <td className="px-4 py-3">
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
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(sub.subscribed_at).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                      {sub.unsubscribed_at
                        ? new Date(sub.unsubscribed_at).toLocaleDateString('ko-KR')
                        : '-'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleActive(sub)}
                          disabled={actionLoading === sub.id}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                            sub.is_active
                              ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          } disabled:opacity-50`}
                        >
                          {actionLoading === sub.id ? (
                            <Loader2 className="w-3 h-3 animate-spin inline" />
                          ) : sub.is_active ? (
                            '해지'
                          ) : (
                            '재활성'
                          )}
                        </button>
                        <button
                          onClick={() => deleteSub(sub.id)}
                          disabled={actionLoading === sub.id}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, displayTotal)} / {displayTotal}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                const pageNum = totalPages <= 7 ? i : Math.max(0, Math.min(page - 3 + i, totalPages - 7 + i));
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      page === pageNum
                        ? 'bg-primary-800 text-white'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page === totalPages - 1}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
