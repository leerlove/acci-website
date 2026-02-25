import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2, Pin, Eye, X, ChevronLeft, ChevronRight, Search } from 'lucide-react';

const CATEGORIES = ['학회소식', '보도자료', '공지사항'];
const PAGE_SIZE = 10;

const CATEGORY_BADGE = {
  '학회소식': 'bg-blue-100 text-blue-700',
  '보도자료': 'bg-purple-100 text-purple-700',
  '공지사항': 'bg-red-100 text-red-700',
};

const EMPTY_FORM = {
  category: '학회소식',
  title: '',
  summary: '',
  content: '',
  author: '',
  image_url: '',
  is_published: true,
  is_pinned: false,
};

export default function NewsManagementPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCategory, setFilterCategory] = useState('전체');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from('news').select('*', { count: 'exact' });
      if (filterCategory !== '전체') query = query.eq('category', filterCategory);
      if (searchQuery) query = query.ilike('title', `%${searchQuery}%`);
      query = query
        .order('is_pinned', { ascending: false })
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
  }, [filterCategory, page, searchQuery]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  useEffect(() => { setPage(1); }, [filterCategory, searchQuery]);

  const openCreate = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditTarget(item);
    setForm({
      category: item.category,
      title: item.title,
      summary: item.summary || '',
      content: item.content || '',
      author: item.author || '',
      image_url: item.image_url || '',
      is_published: item.is_published,
      is_pinned: item.is_pinned,
    });
    setFormError(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditTarget(null);
    setFormError(null);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setFormError('제목을 입력하세요.'); return; }
    if (!form.content.trim()) { setFormError('내용을 입력하세요.'); return; }
    if (!form.author.trim()) { setFormError('작성자를 입력하세요.'); return; }
    setSaving(true);
    setFormError(null);
    try {
      if (editTarget) {
        const { error: err } = await supabase
          .from('news')
          .update({ ...form, updated_at: new Date().toISOString() })
          .eq('id', editTarget.id);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from('news').insert(form);
        if (err) throw err;
      }
      closeModal();
      fetchItems();
    } catch (e) {
      setFormError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const togglePublished = async (item) => {
    const { error: err } = await supabase
      .from('news')
      .update({ is_published: !item.is_published, updated_at: new Date().toISOString() })
      .eq('id', item.id);
    if (!err) fetchItems();
  };

  const togglePinned = async (item) => {
    const { error: err } = await supabase
      .from('news')
      .update({ is_pinned: !item.is_pinned, updated_at: new Date().toISOString() })
      .eq('id', item.id);
    if (!err) fetchItems();
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`"${item.title}" 게시글을 삭제하시겠습니까?`)) return;
    const { error: err } = await supabase.from('news').delete().eq('id', item.id);
    if (!err) fetchItems();
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">소식 관리</h1>
          <p className="text-sm text-gray-500 mt-1">총 {total}건의 게시글</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-900 transition-colors font-medium text-sm"
        >
          <Plus size={16} />
          새 글 작성
        </button>
      </div>

      {/* 필터 + 검색 */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2 flex-wrap">
          {['전체', ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative ml-auto">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="제목 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>
      </div>

      {/* 테이블 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-gray-400 text-sm">불러오는 중...</div>
        ) : error ? (
          <div className="flex items-center justify-center h-48 text-red-500 text-sm">{error}</div>
        ) : items.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-gray-400 text-sm">게시글이 없습니다.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">카테고리</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">제목</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">작성자</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">상태</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">고정</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    <Eye size={14} className="inline" />
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">작성일</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">액션</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${CATEGORY_BADGE[item.category] || 'bg-gray-100 text-gray-600'}`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      <p className="font-medium text-gray-900 truncate">{item.title}</p>
                      {item.summary && <p className="text-gray-400 text-xs truncate mt-0.5">{item.summary}</p>}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{item.author || '-'}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => togglePublished(item)}
                        className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
                          item.is_published
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {item.is_published ? '발행' : '미발행'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => togglePinned(item)}
                        className={`p-1 rounded transition-colors ${
                          item.is_pinned ? 'text-primary' : 'text-gray-300 hover:text-gray-500'
                        }`}
                        title={item.is_pinned ? '고정 해제' : '고정'}
                      >
                        <Pin size={14} />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{item.view_count || 0}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(item.created_at).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEdit(item)}
                          className="p-1.5 rounded text-gray-400 hover:text-primary hover:bg-primary-50 transition-colors"
                          title="수정"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-1.5 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="삭제"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
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

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                {editTarget ? '게시글 수정' : '새 글 작성'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1 rounded">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {formError && (
                <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">{formError}</div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">카테고리 <span className="text-red-500">*</span></label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleFormChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                  >
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">작성자 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="author"
                    value={form.author}
                    onChange={handleFormChange}
                    placeholder="작성자 이름"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">제목 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  placeholder="게시글 제목"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">요약 <span className="text-gray-400 font-normal">(선택)</span></label>
                <input
                  type="text"
                  name="summary"
                  value={form.summary}
                  onChange={handleFormChange}
                  placeholder="목록에 표시될 짧은 요약"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">내용 <span className="text-red-500">*</span></label>
                <textarea
                  name="content"
                  value={form.content}
                  onChange={handleFormChange}
                  placeholder="게시글 본문 내용"
                  rows={8}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 resize-y"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이미지 URL <span className="text-gray-400 font-normal">(선택)</span></label>
                <input
                  type="url"
                  name="image_url"
                  value={form.image_url}
                  onChange={handleFormChange}
                  placeholder="https://..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_published"
                    checked={form.is_published}
                    onChange={handleFormChange}
                    className="w-4 h-4 rounded accent-primary"
                  />
                  <span className="text-sm text-gray-700">발행</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="is_pinned"
                    checked={form.is_pinned}
                    onChange={handleFormChange}
                    className="w-4 h-4 rounded accent-primary"
                  />
                  <span className="text-sm text-gray-700">상단 고정</span>
                </label>
              </div>
            </form>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 rounded-lg text-sm bg-primary text-white hover:bg-primary-900 transition-colors disabled:opacity-50"
              >
                {saving ? '저장 중...' : '저장'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
