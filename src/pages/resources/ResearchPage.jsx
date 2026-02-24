import SubpageLayout from '../../components/common/SubpageLayout';
import { Database, Presentation, FileBarChart2, BarChart3, Bell } from 'lucide-react';

const categories = [
  {
    icon: Presentation,
    title: '학술대회 발표자료',
    desc: '학술대회에서 발표된 연구자료로, 반려문화 및 반려산업 분야의 최신 연구 성과를 공유합니다.',
  },
  {
    icon: FileBarChart2,
    title: '정책 연구보고서',
    desc: '정책간담회 결과보고서 및 정책 제언 자료로, 반려동물 관련 산업 정책 수립에 기여하는 자료입니다.',
  },
  {
    icon: BarChart3,
    title: '연구 데이터셋',
    desc: '공개 연구 데이터로, 반려문화 및 반려산업 분야의 연구를 위한 기초 데이터를 제공합니다.',
  },
];

const ResearchPage = () => {
  return (
    <SubpageLayout title="연구자료" subtitle="연구자료 다운로드" sectionPath="/resources">
      <div className="space-y-6">
        {/* Info card */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex gap-4">
          <Database className="w-8 h-8 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-1">연구자료 안내</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              한국반려문화산업학회의 연구자료는 제1회 학술대회 이후 순차적으로 공개될 예정입니다.
              학술대회 발표자료, 정책 연구보고서, 공개 데이터셋 등 다양한 자료를 제공할 계획입니다.
            </p>
          </div>
        </div>

        {/* Category cards */}
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-bold text-gray-900">{cat.title}</h3>
                  <span className="ml-2 px-2 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-700 flex-shrink-0">
                    준비중
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{cat.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Notification note */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex gap-3 items-start">
          <Bell className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-500 leading-relaxed">
            연구자료는 제1회 학술대회(2026년 6월 예정) 이후 공개됩니다.
            공지사항을 통해 업로드 소식을 안내드릴 예정이니 관심 있는 분들의 많은 이용 바랍니다.
          </p>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default ResearchPage;
