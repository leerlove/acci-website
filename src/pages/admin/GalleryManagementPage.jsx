import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { Upload, Image, Trash2, Edit, X, GripVertical, CheckCircle, AlertCircle } from 'lucide-react';

const CATEGORIES = ['일반', '학술대회', '행사', '기타'];

const EMPTY_FORM = {
  title: '',
  description: '',
  category: '일반',
};

export default function GalleryManagementPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCategory, setFilterCategory] = useState('전체');
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formError, setFormError] = useState(null);
  const [storageError, setStorageError] = useState(null);
  const fileInputRef = useRef(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from('gallery_items').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: false });
      if (filterCategory !== '전체') query = query.eq('category', filterCategory);
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

  const openUpload = () => {
    setEditTarget(null);
    setForm(EMPTY_FORM);
    setFile(null);
    setPreview(null);
    setFormError(null);
    setStorageError(null);
    setUploadProgress(0);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditTarget(item);
    setForm({ title: item.title, description: item.description || '', category: item.category || '일반' });
    setFile(null);
    setPreview(item.image_url);
    setFormError(null);
    setStorageError(null);
    setUploadProgress(0);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditTarget(null);
    setFile(null);
    setPreview(null);
    setFormError(null);
    setStorageError(null);
  };

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith('image/')) {
      setFormError('이미지 파일만 업로드 가능합니다.');
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setFormError('파일 크기는 10MB 이하여야 합니다.');
      return;
    }
    setFormError(null);
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFileSelect(dropped);
  };

  const handleDragOver = (e) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setFormError('제목을 입력하세요.'); return; }
    if (!editTarget && !file) { setFormError('이미지를 선택하세요.'); return; }

    setUploading(true);
    setFormError(null);
    setStorageError(null);
    setUploadProgress(10);

    try {
      let imageUrl = editTarget?.image_url || '';

      if (file) {
        const ext = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        setUploadProgress(30);
        const { error: uploadErr } = await supabase.storage.from('gallery').upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

        if (uploadErr) {
          if (uploadErr.message.includes('Bucket not found') || uploadErr.message.includes('not found')) {
            setStorageError('Supabase Storage 버킷 "gallery"가 존재하지 않습니다. Supabase 대시보드 > Storage에서 "gallery" 버킷을 생성한 후 다시 시도하세요.');
          } else {
            setStorageError(`파일 업로드 실패: ${uploadErr.message}`);
          }
          setUploading(false);
          setUploadProgress(0);
          return;
        }

        setUploadProgress(70);
        const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(fileName);
        imageUrl = publicUrl;
      }

      setUploadProgress(85);

      if (editTarget) {
        const { error: dbErr } = await supabase
          .from('gallery_items')
          .update({ title: form.title, description: form.description, category: form.category, image_url: imageUrl, thumbnail_url: imageUrl })
          .eq('id', editTarget.id);
        if (dbErr) throw dbErr;
      } else {
        const { error: dbErr } = await supabase.from('gallery_items').insert({
          title: form.title,
          description: form.description,
          category: form.category,
          image_url: imageUrl,
          thumbnail_url: imageUrl,
          is_published: true,
          sort_order: items.length,
        });
        if (dbErr) throw dbErr;
      }

      setUploadProgress(100);
      setTimeout(() => {
        closeModal();
        fetchItems();
      }, 400);
    } catch (e) {
      setFormError(e.message);
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`"${item.title}" 사진을 삭제하시겠습니까?\n스토리지 파일도 함께 삭제됩니다.`)) return;
    try {
      if (item.image_url) {
        const urlParts = item.image_url.split('/');
        const fileName = urlParts[urlParts.length - 1];
        if (fileName) {
          await supabase.storage.from('gallery').remove([fileName]);
        }
      }
      const { error: err } = await supabase.from('gallery_items').delete().eq('id', item.id);
      if (err) throw err;
      fetchItems();
    } catch (e) {
      alert(`삭제 실패: ${e.message}`);
    }
  };

  const togglePublished = async (item) => {
    const { error: err } = await supabase
      .from('gallery_items')
      .update({ is_published: !item.is_published })
      .eq('id', item.id);
    if (!err) fetchItems();
  };

  const filteredItems = items;

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">갤러리 관리</h1>
          <p className="text-sm text-gray-500 mt-1">총 {filteredItems.length}개의 사진</p>
        </div>
        <button
          onClick={openUpload}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-900 transition-colors font-medium text-sm"
        >
          <Upload size={16} />
          사진 업로드
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

      {/* 갤러리 그리드 */}
      {loading ? (
        <div className="flex items-center justify-center h-48 text-gray-400 text-sm">불러오는 중...</div>
      ) : error ? (
        <div className="flex items-center justify-center h-48 text-red-500 text-sm">{error}</div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center h-48 gap-3 text-gray-400">
          <Image size={32} />
          <p className="text-sm">등록된 사진이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
              {/* 이미지 */}
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                {item.thumbnail_url || item.image_url ? (
                  <img
                    src={item.thumbnail_url || item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Image size={40} />
                  </div>
                )}
                {/* 오버레이 액션 */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="p-2 bg-white rounded-lg text-gray-700 hover:text-primary transition-colors"
                    title="수정"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="p-2 bg-white rounded-lg text-gray-700 hover:text-red-500 transition-colors"
                    title="삭제"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                {/* 드래그 핸들 */}
                <div className="absolute top-2 left-2 text-white/60 cursor-grab">
                  <GripVertical size={16} />
                </div>
              </div>
              {/* 정보 */}
              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{item.title}</p>
                    {item.description && (
                      <p className="text-gray-400 text-xs mt-0.5 truncate">{item.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => togglePublished(item)}
                    className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium transition-colors ${
                      item.is_published
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {item.is_published ? '발행' : '미발행'}
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                    {item.category || '일반'}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(item.created_at).toLocaleDateString('ko-KR')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 업로드/수정 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                {editTarget ? '사진 정보 수정' : '사진 업로드'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-1 rounded">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
              {/* 에러 메시지 */}
              {formError && (
                <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg flex items-start gap-2">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  {formError}
                </div>
              )}
              {storageError && (
                <div className="bg-amber-50 text-amber-700 text-sm px-4 py-3 rounded-lg flex items-start gap-2">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">스토리지 오류</p>
                    <p className="mt-1">{storageError}</p>
                  </div>
                </div>
              )}

              {/* 파일 업로드 영역 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이미지 {!editTarget && <span className="text-red-500">*</span>}
                  {editTarget && <span className="text-gray-400 font-normal"> (변경하려면 새 파일 선택)</span>}
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`relative border-2 border-dashed rounded-xl cursor-pointer transition-colors overflow-hidden ${
                    dragOver
                      ? 'border-primary bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                  }`}
                >
                  {preview ? (
                    <div className="relative">
                      <img
                        src={preview}
                        alt="미리보기"
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-white text-sm font-medium">클릭하여 변경</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 py-10 text-gray-400">
                      <Image size={32} />
                      <p className="text-sm">
                        {dragOver ? '여기에 놓으세요' : '클릭하거나 파일을 드래그하세요'}
                      </p>
                      <p className="text-xs">JPG, PNG, GIF, WebP — 최대 10MB</p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                />
              </div>

              {/* 업로드 진행률 */}
              {uploading && uploadProgress > 0 && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{uploadProgress < 100 ? '업로드 중...' : '완료!'}</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  {uploadProgress === 100 && (
                    <div className="flex items-center gap-1 text-green-600 text-xs">
                      <CheckCircle size={12} />
                      업로드 완료
                    </div>
                  )}
                </div>
              )}

              {/* 제목 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">제목 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  placeholder="사진 제목"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
              </div>

              {/* 설명 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">설명 <span className="text-gray-400 font-normal">(선택)</span></label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  placeholder="사진에 대한 설명"
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200 resize-y"
                />
              </div>

              {/* 카테고리 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleFormChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </form>

            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100">
              <button
                type="button"
                onClick={closeModal}
                disabled={uploading}
                className="px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                취소
              </button>
              <button
                onClick={handleSave}
                disabled={uploading}
                className="px-4 py-2 rounded-lg text-sm bg-primary text-white hover:bg-primary-900 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {uploading && <span className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />}
                {uploading ? '처리 중...' : editTarget ? '수정 저장' : '업로드'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
