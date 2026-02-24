import SubpageLayout from '../../components/common/SubpageLayout';
import { Image, Camera, Bell } from 'lucide-react';

const placeholders = [
  { label: '창립총회', date: '2026.01' },
  { label: '학술대회', date: '2026.06 예정' },
  { label: '연구발표회', date: '2026년 예정' },
  { label: '정책간담회', date: '2026년 예정' },
];

const GalleryPage = () => {
  return (
    <SubpageLayout title="갤러리" subtitle="학회 활동 사진" sectionPath="/resources">
      <div className="space-y-6">
        {/* Info header */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex gap-4">
          <Camera className="w-8 h-8 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-1">갤러리 안내</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              한국반려문화산업학회의 주요 활동 사진을 기록하고 공유하는 공간입니다.
              창립총회를 시작으로 학술대회, 연구발표회, 정책간담회 등 다양한 행사 사진이 순차적으로 등록될 예정입니다.
            </p>
          </div>
        </div>

        {/* Placeholder grid */}
        <div className="grid grid-cols-2 gap-4">
          {placeholders.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-3 p-8 min-h-[180px] hover:border-primary/30 hover:bg-primary/5 transition-colors"
            >
              <div className="w-12 h-12 bg-white rounded-xl border border-gray-200 flex items-center justify-center">
                <Image className="w-6 h-6 text-gray-300" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-gray-700">{item.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{item.date}</p>
              </div>
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-400">
                사진 준비중
              </span>
            </div>
          ))}
        </div>

        {/* Info note */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex gap-3 items-start">
          <Bell className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-500 leading-relaxed">
            행사 종료 후 촬영 사진이 순차적으로 업로드됩니다.
            주요 행사 사진 게시 시 학회 공지사항을 통해 안내드릴 예정입니다.
          </p>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default GalleryPage;
