import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit, Trash2, X, Users, Loader2, Image, Upload } from 'lucide-react';

const CATEGORIES = ['학회장', '부회장', '고문', '상임이사', '위원회 위원장', '행정간사'];

const CATEGORY_BADGE = {
  '학회장': 'bg-purple-100 text-purple-700',
  '부회장': 'bg-blue-100 text-blue-700',
  '고문': 'bg-amber-100 text-amber-700',
  '상임이사': 'bg-green-100 text-green-700',
  '위원회 위원장': 'bg-cyan-100 text-cyan-700',
  '행정간사': 'bg-pink-100 text-pink-700',
};

const EMPTY_FORM = {
  name: '',
  role: '',
  category: '상임이사',
  affiliation: '',
  photo_url: '',
  bio: [''],
  is_active: true,
  sort_order: 0,
};

export default function ExecutivesManagementPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCategory, setFilterCategory] = useState('전체');
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);
  const [photoUploading, setPhotoUploading] = useState(false);

  const uploadPhoto = async (file) => {
    const ext = file.name.split('.').pop();
    const fileName = `photos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { data, error: uploadErr } = await supabase.storage.from('executives').upload(fileName, file);
    if (uploadErr) throw uploadErr;
    const { data: urlData } = supabase.storage.from('executives').getPublicUrl(data.path);
    return urlData.publicUrl;
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUploading(true);
    try {
      const url = await uploadPhoto(file);
      setForm((prev) => ({ ...prev, photo_url: url }));
    } catch (err) {
      setFormError('사진 업로드 실패: ' + err.message);
    } finally {
      setPhotoUploading(false);
      e.target.value = '';
    }
  };

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from('executives').select('*');
      if (filterCategory !== '전체') query = query.eq('category', filterCategory);
      query = query
        .order('category', { ascending: true })
        .order('sort_order', { ascending: true });

      const { data, error: err } = await query;
      if (err) throw err;
      setItems(data || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [filterCategory]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const openCreate = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditTarget(item);
    setForm({
      name: item.name,
      role: item.role,
      category: item.category,
      affiliation: item.affiliation || '',
      photo_url: item.photo_url || '',
      bio: item.bio && item.bio.length > 0 ? item.bio : [''],
      is_active: item.is_active,
      sort_order: item.sort_order ?? 0,
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

  const handleBioChange = (index, value) => {
    setForm((prev) => {
      const bio = [...prev.bio];
      bio[index] = value;
      return { ...prev, bio };
    });
  };

  const addBioLine = () => {
    setForm((prev) => ({ ...prev, bio: [...prev.bio, ''] }));
  };

  const removeBioLine = (index) => {
    setForm((prev) => {
      const bio = prev.bio.filter((_, i) => i !== index);
      return { ...prev, bio: bio.length > 0 ? bio : [''] };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setFormError('이름을 입력하세요.'); return; }
    if (!form.role.trim()) { setFormError('직책을 입력하세요.'); return; }
    setSaving(true);
    setFormError(null);
    try {
      const cleanBio = form.bio.filter((line) => line.trim() !== '');
      const saveData = {
        name: form.name.trim(),
        role: form.role.trim(),
        category: form.category,
        affiliation: form.affiliation.trim(),
        photo_url: form.photo_url,
        bio: cleanBio,
        is_active: form.is_active,
        sort_order: Number(form.sort_order) || 0,
      };
      if (editTarget) {
        const { error: err } = await supabase
          .from('executives')
          .update(saveData)
          .eq('id', editTarget.id);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from('executives').insert(saveData);
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

  const toggleActive = async (item) => {
    const { error: err } = await supabase
      .from('executives')
      .update({ is_active: !item.is_active })
      .eq('id', item.id);
    if (!err) fetchItems();
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`"${item.name}" 임원을 삭제하시겠습니까?`)) return;
    const { error: err } = await supabase.from('executives').delete().eq('id', item.id);
    if (!err) fetchItems();
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">임원 관리</h1>
          <p className="text-sm text-gray-500 mt-1">총 {items.length}명의 임원</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-900 transition-colors font-medium text-sm"
        >
          <Plus size={16} />
          새 임원 등록
        </button>
      </div>

      {/* 카테고리 필터 */}
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

      {/* 테이블 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-gray-400 text-sm">불러오는 중...</div>
        ) : error ? (
          <div className="flex items-center justify-center h-48 text-red-500 text-sm">{error}</div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3 text-gray-400">
            <Users size={32} />
            <p className="text-sm">등록된 임원이 없습니다.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">카테고리</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">이름</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">직책</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">소속</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">사진</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">이력</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">활성</th>
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
                    <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                    <td className="px-4 py-3 text-gray-600">{item.role}</td>
                    <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{item.affiliation || '-'}</td>
                    <td className="px-4 py-3">
                      {item.photo_url ? (
                        <span className="flex items-center gap-1 text-green-600 text-xs">
                          <Image size={13} />
                          유
                        </span>
                      ) : (
                        <span className="text-gray-300 text-xs">무</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {item.bio && item.bio.length > 0 ? `${item.bio.length}건` : '-'}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleActive(item)}
                        className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
                          item.is_active
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {item.is_active ? '활성' : '비활성'}
                      </button>
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

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                {editTarget ? '임원 수정' : '새 임원 등록'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1 rounded">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {formError && (
                <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">{formError}</div>
              )}

              {/* 카테고리 */}
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

              {/* 이름 + 직책 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">이름 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    placeholder="홍길동"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">직책 <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    name="role"
                    value={form.role}
                    onChange={handleFormChange}
                    placeholder="학회장"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                  />
                </div>
              </div>

              {/* 소속 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">소속 <span className="text-gray-400 font-normal">(선택)</span></label>
                <input
                  type="text"
                  name="affiliation"
                  value={form.affiliation}
                  onChange={handleFormChange}
                  placeholder="소속 기관 또는 대학"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>

              {/* 사진 업로드 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">사진 <span className="text-gray-400 font-normal">(선택)</span></label>
                {form.photo_url ? (
                  <div className="relative inline-block">
                    <img
                      src={form.photo_url}
                      alt="미리보기"
                      className="w-24 h-24 object-cover rounded-lg border border-gray-200 bg-gray-50"
                    />
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, photo_url: '' }))}
                      className="absolute -top-1.5 -right-1.5 bg-white border border-gray-200 p-0.5 rounded-full hover:bg-red-50 hover:border-red-200 transition-colors"
                    >
                      <X size={12} className="text-gray-500" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-primary-200 hover:bg-primary-50/30 transition-colors">
                    {photoUploading ? (
                      <Loader2 size={20} className="animate-spin text-primary" />
                    ) : (
                      <>
                        <Upload size={20} className="text-gray-400 mb-1" />
                        <span className="text-xs text-gray-500">클릭하여 사진 업로드</span>
                      </>
                    )}
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" disabled={photoUploading} />
                  </label>
                )}
              </div>

              {/* 이력사항 */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">이력사항 <span className="text-gray-400 font-normal">(선택)</span></label>
                  <button
                    type="button"
                    onClick={addBioLine}
                    className="flex items-center gap-1 text-xs text-primary hover:text-primary-900 transition-colors"
                  >
                    <Plus size={13} />
                    추가
                  </button>
                </div>
                <div className="space-y-2">
                  {form.bio.map((line, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={line}
                        onChange={(e) => handleBioChange(index, e.target.value)}
                        placeholder={`이력 ${index + 1}`}
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeBioLine(index)}
                        disabled={form.bio.length === 1}
                        className="p-1.5 rounded text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 정렬순서 + 활성 */}
              <div className="flex items-center gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">정렬순서</label>
                  <input
                    type="number"
                    name="sort_order"
                    value={form.sort_order}
                    onChange={handleFormChange}
                    min={0}
                    className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                  />
                </div>
                <div className="flex items-center mt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={form.is_active}
                      onChange={handleFormChange}
                      className="w-4 h-4 rounded accent-primary"
                    />
                    <span className="text-sm text-gray-700">활성</span>
                  </label>
                </div>
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
                disabled={saving || photoUploading}
                className="px-4 py-2 rounded-lg text-sm bg-primary text-white hover:bg-primary-900 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {saving && <Loader2 size={14} className="animate-spin" />}
                {saving ? '저장 중...' : '저장'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
