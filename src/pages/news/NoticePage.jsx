import SubpageLayout from '../../components/common/SubpageLayout';
import { Bell } from 'lucide-react';

const NoticePage = () => {
  const notices = [
    { id: 1, category: '공지', title: '한국반려문화산업학회 창립총회 개최 안내', date: '2026.01.15', isNew: true },
    { id: 2, category: '공지', title: '창립회원 모집 안내 (~ 2026.02.28)', date: '2026.01.10', isNew: true },
    { id: 3, category: '학술', title: '2026년 상반기 학술대회 일정 공고', date: '2026.01.08', isNew: false },
    { id: 4, category: '공지', title: '학회지 창간호 논문 투고 안내', date: '2026.01.05', isNew: false },
    { id: 5, category: '소식', title: '학회 사무국 운영 안내', date: '2026.01.02', isNew: false },
  ];

  return (
    <SubpageLayout title="공지사항" subtitle="학회의 주요 공지사항" sectionPath="/news">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          <span className="font-bold text-gray-900">전체 {notices.length}건</span>
        </div>
        {notices.map((notice, i) => (
          <div key={notice.id} className={`flex items-center gap-4 px-6 py-4 hover:bg-primary-50/50 transition-colors cursor-pointer ${
            i !== notices.length - 1 ? 'border-b border-gray-100' : ''
          }`}>
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full flex-shrink-0 ${
              notice.category === '공지' ? 'bg-primary-100 text-primary' :
              notice.category === '학술' ? 'bg-secondary/20 text-secondary-dark' :
              'bg-gray-100 text-gray-600'
            }`}>{notice.category}</span>
            <span className="flex-1 text-gray-800 font-medium truncate">
              {notice.title}
              {notice.isNew && <span className="ml-2 px-1.5 py-0.5 text-[10px] bg-red-500 text-white rounded">N</span>}
            </span>
            <span className="text-sm text-gray-400 hidden sm:block flex-shrink-0">{notice.date}</span>
          </div>
        ))}
      </div>
    </SubpageLayout>
  );
};
export default NoticePage;
