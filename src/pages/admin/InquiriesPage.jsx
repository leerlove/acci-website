import { useState, useEffect, useCallback } from 'react';
import { Eye, EyeOff, Trash2, X, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const CATEGORY_OPTIONS = ['전체', '일반문의', '입회문의', '학술문의', '광고/협찬', '기타'];
const PAGE_SIZE = 10;

const categoryColors = {
  '일반문의': 'bg-blue-100 text-blue-700',
  '입회문의': 'bg-primary-100 text-primary-800',
  '학술문의': 'bg-purple-100 text-purple-700',
  '광고/협찬': 'bg-yellow-100 text-yellow-700',
  '기타': 'bg-gray-100 text-gray-600',
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState('전체');
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchInquiries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('contact_inquiries')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

      if (filter !== '전체') query = query.eq('category', filter);
      if (unreadOnly) query = query.eq('is_read', false);

      const { data, count, error: err } = await query;
      if (err) throw err;
      setInquiries(data ?? []);
      setTotal(count ?? 0);
    } catch (err) {
      setError('문의 목록을 불러오는 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, filter, unreadOnly]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  // 필터/탭 변경 시 페이지 초기화
  useEffect(() => {
    setPage(0);
  }, [filter, unreadOnly]);

  async function markAsRead(id) {
    setActionLoading(true);
    try {
      const { error: err } = await supabase
        .from('contact_inquiries')
        .update({ is_read: true })
        .eq('id', id);
      if (err) throw err;
      setSelected((prev) => (prev ? { ...prev, is_read: true } : prev));
      fetchInquiries();
    } catch (err) {
      alert('읽음 처리 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  }

  async function deleteInquiry(id) {
    if (!window.confirm('이 문의를 삭제하시겠습니까?')) return;
    setActionLoading(true);
    try {
      const { error: err } = await supabase
        .from('contact_inquiries')
        .delete()
        .eq('id', id);
      if (err) throw err;
      setSelected(null);
      fetchInquiries();
    } catch (err) {
      alert('삭제 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  }

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">문의 관리</h1>
        <p className="text-sm text-gray-500 mt-1">총 {total.toLocaleString()}건의 문의</p>
      </div>

      {/* 필터 */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === cat
                  ? 'bg-primary-800 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          onClick={() => setUnreadOnly((v) => !v)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            unreadOnly
              ? 'bg-red-500 text-white'
              : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
          }`}
        >
          읽지 않은 문의만
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* 테이블 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-6 h-6 animate-spin text-primary-800" />
          </div>
        ) : inquiries.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-12">문의가 없습니다.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 text-gray-500 font-medium w-10">상태</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">카테고리</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">제목</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">이름</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium">이메일</th>
                  <th className="text-left px-4 py-3 text-gray-500 font-medium whitespace-nowrap">날짜</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setSelected(item)}
                    className={`border-b border-gray-50 last:border-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                      !item.is_read ? 'bg-primary-50' : ''
                    }`}
                  >
                    <td className="px-4 py-3 text-center">
                      {item.is_read ? (
                        <Eye className="w-4 h-4 text-gray-300 inline" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-red-500 inline" />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          categoryColors[item.category] ?? 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-800 max-w-xs truncate font-medium">
                      {item.subject}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{item.name}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-[160px] truncate">{item.email}</td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
                      {new Date(item.created_at).toLocaleDateString('ko-KR')}
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
              {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} / {total}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    page === i
                      ? 'bg-primary-800 text-white'
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
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

      {/* 상세 모달 */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">문의 상세</h2>
              <button
                onClick={() => setSelected(null)}
                className="p-1 rounded-lg hover:bg-gray-100"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* 모달 내용 */}
            <div className="px-6 py-5 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 mb-0.5">카테고리</p>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      categoryColors[selected.category] ?? 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {selected.category}
                  </span>
                </div>
                <div>
                  <p className="text-gray-500 mb-0.5">접수일</p>
                  <p className="text-gray-800">{new Date(selected.created_at).toLocaleDateString('ko-KR')}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-0.5">이름</p>
                  <p className="text-gray-800 font-medium">{selected.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-0.5">연락처</p>
                  <p className="text-gray-800">{selected.phone || '-'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 mb-0.5">이메일</p>
                  <p className="text-gray-800">{selected.email}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 mb-0.5">제목</p>
                  <p className="text-gray-800 font-medium">{selected.subject}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500 mb-1">내용</p>
                  <div className="bg-gray-50 rounded-xl p-3 text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selected.message}
                  </div>
                </div>
              </div>
            </div>

            {/* 모달 액션 */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => deleteInquiry(selected.id)}
                disabled={actionLoading}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                삭제
              </button>
              {!selected.is_read && (
                <button
                  onClick={() => markAsRead(selected.id)}
                  disabled={actionLoading}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-primary-800 text-white hover:bg-primary-900 transition-colors disabled:opacity-50"
                >
                  {actionLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                  읽음 처리
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
