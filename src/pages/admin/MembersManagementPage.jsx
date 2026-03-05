import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { Eye, CheckCircle, XCircle, Search, ChevronLeft, ChevronRight, X, Users, Loader2 } from 'lucide-react';

const PAGE_SIZE = 10;

const STATUS_TABS = ['전체', '대기중', '승인', '거절'];
const STATUS_VALUE_MAP = { '전체': null, '대기중': 'pending', '승인': 'approved', '거절': 'rejected' };

const STATUS_BADGE = {
  pending:  { cls: 'bg-yellow-100 text-yellow-700', label: '검토중' },
  approved: { cls: 'bg-green-100 text-green-700',  label: '승인'   },
  rejected: { cls: 'bg-red-100 text-red-700',      label: '거절'   },
};

const MEMBER_TYPE_BADGE = {
  '정회원':  'bg-blue-100 text-blue-700',
  '준회원':  'bg-indigo-100 text-indigo-700',
  '학생회원': 'bg-purple-100 text-purple-700',
  '기관회원': 'bg-teal-100 text-teal-700',
  '명예회원': 'bg-amber-100 text-amber-700',
};

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${color}`}>
        <Users size={18} />
      </div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

export default function MembersManagementPage() {
  const { user } = useAuth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterTab, setFilterTab] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });

  const [detailItem, setDetailItem] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchStats = useCallback(async () => {
    const { data } = await supabase
      .from('membership_applications')
      .select('status');
    if (!data) return;
    const counts = { total: data.length, pending: 0, approved: 0, rejected: 0 };
    for (const row of data) {
      if (row.status in counts) counts[row.status]++;
    }
    setStats(counts);
  }, []);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('membership_applications')
        .select('*', { count: 'exact' });

      const statusValue = STATUS_VALUE_MAP[filterTab];
      if (statusValue) query = query.eq('status', statusValue);

      if (searchQuery) {
        query = query.or(
          `applicant_name.ilike.%${searchQuery}%,applicant_email.ilike.%${searchQuery}%`
        );
      }

      query = query
        .order('created_at', { ascending: false })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

      const { data, count, error: err } = await query;
      if (err) throw err;
      setItems(data || []);
      setTotal(count || 0);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [filterTab, searchQuery, page]);

  useEffect(() => { fetchItems(); fetchStats(); }, [fetchItems, fetchStats]);
  useEffect(() => { setPage(1); }, [filterTab, searchQuery]);

  const handleApprove = async (item) => {
    setActionLoading(true);
    try {
      const { error: err } = await supabase
        .from('membership_applications')
        .update({
          status: 'approved',
          reviewed_at: new Date().toISOString(),
          reviewed_by: user?.email || '',
        })
        .eq('id', item.id);
      if (err) throw err;
      setDetailItem(prev => prev?.id === item.id
        ? { ...prev, status: 'approved', reviewed_at: new Date().toISOString(), reviewed_by: user?.email || '' }
        : prev
      );
      fetchItems();
      fetchStats();
    } catch (e) {
      alert('승인 실패: ' + e.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (item) => {
    const reason = window.prompt('거절 사유를 입력하세요 (선택):', '');
    if (reason === null) return; // cancelled
    setActionLoading(true);
    try {
      const { error: err } = await supabase
        .from('membership_applications')
        .update({
          status: 'rejected',
          admin_note: reason || null,
          reviewed_at: new Date().toISOString(),
          reviewed_by: user?.email || '',
        })
        .eq('id', item.id);
      if (err) throw err;
      setDetailItem(prev => prev?.id === item.id
        ? { ...prev, status: 'rejected', admin_note: reason || null, reviewed_at: new Date().toISOString(), reviewed_by: user?.email || '' }
        : prev
      );
      fetchItems();
      fetchStats();
    } catch (e) {
      alert('거절 처리 실패: ' + e.message);
    } finally {
      setActionLoading(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">회원 신청 관리</h1>
        <p className="text-sm text-gray-500 mt-1">총 {stats.total}건의 신청</p>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="총 신청" value={stats.total}    color="bg-gray-100 text-gray-500" />
        <StatCard label="대기중"  value={stats.pending}  color="bg-yellow-100 text-yellow-600" />
        <StatCard label="승인"    value={stats.approved} color="bg-green-100 text-green-600" />
        <StatCard label="거절"    value={stats.rejected} color="bg-red-100 text-red-500" />
      </div>

      {/* 필터 탭 + 검색 */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2 flex-wrap">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterTab === tab
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative ml-auto">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="이름 또는 이메일 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>
      </div>

      {/* 테이블 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48 gap-2 text-gray-400 text-sm">
            <Loader2 size={16} className="animate-spin" />
            불러오는 중...
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-48 text-red-500 text-sm">{error}</div>
        ) : items.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-gray-400 text-sm">신청 내역이 없습니다.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">신청일</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">회원유형</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">이름</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">이메일</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">소속</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">상태</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">액션</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((item) => {
                  const badge = STATUS_BADGE[item.status] || STATUS_BADGE.pending;
                  const typeCls = MEMBER_TYPE_BADGE[item.member_type] || 'bg-gray-100 text-gray-600';
                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                        {new Date(item.created_at).toLocaleDateString('ko-KR')}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeCls}`}>
                          {item.member_type || '-'}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">{item.applicant_name}</td>
                      <td className="px-4 py-3 text-gray-600">{item.applicant_email}</td>
                      <td className="px-4 py-3 text-gray-600 max-w-[160px] truncate">{item.affiliation || '-'}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge.cls}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => setDetailItem(item)}
                            className="p-1.5 rounded text-gray-400 hover:text-primary hover:bg-primary-50 transition-colors"
                            title="상세보기"
                          >
                            <Eye size={14} />
                          </button>
                          {item.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApprove(item)}
                                disabled={actionLoading}
                                className="p-1.5 rounded text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors disabled:opacity-40"
                                title="승인"
                              >
                                <CheckCircle size={14} />
                              </button>
                              <button
                                onClick={() => handleReject(item)}
                                disabled={actionLoading}
                                className="p-1.5 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                                title="거절"
                              >
                                <XCircle size={14} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                p === page ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {p}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* 상세 모달 */}
      {detailItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
            {/* 모달 헤더 */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">회원 신청 상세</h2>
              <button
                onClick={() => setDetailItem(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded"
              >
                <X size={20} />
              </button>
            </div>

            {/* 모달 본문 */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {/* 상태 배지 */}
              <div className="flex items-center gap-2">
                {(() => {
                  const badge = STATUS_BADGE[detailItem.status] || STATUS_BADGE.pending;
                  const typeCls = MEMBER_TYPE_BADGE[detailItem.member_type] || 'bg-gray-100 text-gray-600';
                  return (
                    <>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${typeCls}`}>
                        {detailItem.member_type || '-'}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${badge.cls}`}>
                        {badge.label}
                      </span>
                    </>
                  );
                })()}
              </div>

              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                <div>
                  <dt className="text-gray-500 mb-0.5">이름</dt>
                  <dd className="font-medium text-gray-900">{detailItem.applicant_name}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 mb-0.5">이메일</dt>
                  <dd className="font-medium text-gray-900 break-all">{detailItem.applicant_email}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 mb-0.5">연락처</dt>
                  <dd className="font-medium text-gray-900">{detailItem.applicant_phone || '-'}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 mb-0.5">소속</dt>
                  <dd className="font-medium text-gray-900">{detailItem.affiliation || '-'}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 mb-0.5">직위</dt>
                  <dd className="font-medium text-gray-900">{detailItem.position || '-'}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 mb-0.5">신청일</dt>
                  <dd className="font-medium text-gray-900">
                    {new Date(detailItem.created_at).toLocaleDateString('ko-KR')}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-gray-500 mb-0.5">자격근거</dt>
                  <dd className="font-medium text-gray-900 whitespace-pre-wrap">
                    {detailItem.qualification || '-'}
                  </dd>
                </div>
              </dl>

              {/* 심사 정보 (이미 처리된 경우) */}
              {detailItem.reviewed_at && (
                <div className="border-t border-gray-100 pt-4 space-y-3 text-sm">
                  <p className="font-semibold text-gray-700">심사 정보</p>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                      <dt className="text-gray-500 mb-0.5">심사일</dt>
                      <dd className="font-medium text-gray-900">
                        {new Date(detailItem.reviewed_at).toLocaleDateString('ko-KR')}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-gray-500 mb-0.5">심사자</dt>
                      <dd className="font-medium text-gray-900 break-all">{detailItem.reviewed_by || '-'}</dd>
                    </div>
                    {detailItem.admin_note && (
                      <div className="col-span-2">
                        <dt className="text-gray-500 mb-0.5">관리자 메모</dt>
                        <dd className="font-medium text-gray-900 whitespace-pre-wrap">{detailItem.admin_note}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}
            </div>

            {/* 모달 푸터 */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              {detailItem.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleApprove(detailItem)}
                    disabled={actionLoading}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm bg-green-600 text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {actionLoading ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />}
                    승인
                  </button>
                  <button
                    onClick={() => handleReject(detailItem)}
                    disabled={actionLoading}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    {actionLoading ? <Loader2 size={14} className="animate-spin" /> : <XCircle size={14} />}
                    거절
                  </button>
                </>
              )}
              <button
                onClick={() => setDetailItem(null)}
                className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
