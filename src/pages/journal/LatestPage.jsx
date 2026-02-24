import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import SubpageLayout from '../../components/common/SubpageLayout';

const JOURNAL_INFO = [
  { label: '학회지명', value: '반려문화 (Companion Culture)' },
  { label: 'ISSN', value: '신청 예정' },
  { label: '발행주기', value: '연 2회 (6월, 12월)' },
  { label: '발행기관', value: '한국반려문화산업학회' },
];

const TIMELINE_STEPS = [
  { id: 1, label: '논문 모집', desc: '투고 규정에 따라 논문 접수', active: true },
  { id: 2, label: '심사 진행', desc: '이중 익명 심사 절차 진행', active: false },
  { id: 3, label: '창간호 발간', desc: '2025년 6월 창간호 발행 예정', active: false },
];

const RELATED_LINKS = [
  { to: '/journal/submission', label: '투고안내', desc: '논문 투고 방법 및 규정 안내' },
  { to: '/journal/ethics', label: '연구윤리규정', desc: '연구 및 출판 윤리 기준' },
];

const LatestPage = () => {
  return (
    <SubpageLayout title="최신호" subtitle="학회지 최신호를 확인합니다" sectionPath="/journal">
      <div className="space-y-6">
        {/* Cover + Info Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Journal Cover Placeholder */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center justify-center min-h-[280px]">
            <div className="w-full max-w-[180px] aspect-[3/4] border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center gap-3 bg-gray-50">
              <BookOpen className="w-10 h-10 text-primary/30" />
              <p className="text-xs text-gray-400 text-center px-3 leading-relaxed">
                창간호 표지
                <br />
                준비중
              </p>
            </div>
            <p className="mt-4 text-xs text-gray-400">반려문화 창간호 (2025. 6.)</p>
          </div>

          {/* Journal Info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col justify-center">
            <h2 className="text-lg font-bold text-gray-900 mb-5">학회지 정보</h2>
            <dl className="space-y-4">
              {JOURNAL_INFO.map(({ label, value }) => (
                <div key={label} className="flex gap-4 items-start">
                  <dt className="w-24 flex-shrink-0 text-sm text-gray-500 pt-0.5">{label}</dt>
                  <dd className="text-sm font-medium text-gray-800">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">발간 일정</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-0">
            {TIMELINE_STEPS.map((step, idx) => (
              <div key={step.id} className="flex sm:flex-col items-center sm:items-center flex-1 w-full sm:w-auto">
                {/* Step node */}
                <div className="flex sm:flex-col items-center gap-3 sm:gap-2 flex-1 sm:flex-none w-full sm:w-auto">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      step.active
                        ? 'bg-primary border-primary text-white'
                        : 'bg-white border-gray-200 text-gray-300'
                    }`}
                  >
                    {step.active ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </div>
                  <div className="sm:text-center">
                    <p
                      className={`text-sm font-semibold ${
                        step.active ? 'text-primary' : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{step.desc}</p>
                  </div>
                </div>

                {/* Connector */}
                {idx < TIMELINE_STEPS.length - 1 && (
                  <div className="hidden sm:flex items-center justify-center w-8 flex-shrink-0">
                    <ArrowRight className="w-4 h-4 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Links */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-gray-900 mb-4">관련 안내</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RELATED_LINKS.map(({ to, label, desc }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-colors group"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors">
                    {label}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default LatestPage;
