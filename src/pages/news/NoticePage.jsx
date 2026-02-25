import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SubpageLayout from '../../components/common/SubpageLayout';
import { Bell, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

const addRecentFlag = (items) => {
  const currentTime = Date.now();
  return items.map((item) => ({
    ...item,
    isRecent: currentTime - new Date(item.created_at).getTime() < SEVEN_DAYS_MS,
  }));
};

const fallbackNotices = addRecentFlag([
  { id: 1, category: '공지사항', title: '한국반려문화산업학회 창립총회 개최 안내', created_at: '2026-01-15', is_pinned: true },
  { id: 2, category: '공지사항', title: '창립회원 모집 안내 (~ 2026.02.28)', created_at: '2026-01-10', is_pinned: true },
  { id: 3, category: '공지사항', title: '2026년 상반기 학술대회 일정 공고', created_at: '2026-01-08', is_pinned: false },
  { id: 4, category: '공지사항', title: '학회지 창간호 논문 투고 안내', created_at: '2026-01-05', is_pinned: false },
  { id: 5, category: '공지사항', title: '학회 사무국 운영 안내', created_at: '2026-01-02', is_pinned: false },
]);

const NoticePage = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      const { data, error } = await supabase
        .from('news')
        .select('id, category, title, created_at, is_pinned')
        .eq('is_published', true)
        .eq('category', '공지사항')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        setNotices(addRecentFlag(data));
      } else {
        setNotices(fallbackNotices);
      }
      setLoading(false);
    };
    fetchNotices();
  }, []);

  return (
    <SubpageLayout title="공지사항" subtitle="학회의 주요 공지사항" sectionPath="/news">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          <span className="font-bold text-gray-900">
            {loading ? '로딩 중...' : `전체 ${notices.length}건`}
          </span>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          notices.map((notice, i) => (
            <Link key={notice.id} to={`/news/notice/${notice.id}`} className={`flex items-center gap-4 px-6 py-4 hover:bg-primary-50/50 transition-colors ${
              i !== notices.length - 1 ? 'border-b border-gray-100' : ''
            }`}>
              <span className="px-2.5 py-1 text-xs font-medium rounded-full flex-shrink-0 bg-primary-100 text-primary">
                {notice.is_pinned ? '필독' : '공지'}
              </span>
              <span className="flex-1 text-gray-800 font-medium truncate">
                {notice.title}
                {notice.isRecent && (
                  <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-red-500 text-white rounded">N</span>
                )}
              </span>
              <span className="text-sm text-gray-400 hidden sm:block flex-shrink-0">
                {new Date(notice.created_at).toLocaleDateString('ko-KR')}
              </span>
            </Link>
          ))
        )}
        {!loading && notices.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">등록된 공지사항이 없습니다.</div>
        )}
      </div>
    </SubpageLayout>
  );
};
export default NoticePage;
