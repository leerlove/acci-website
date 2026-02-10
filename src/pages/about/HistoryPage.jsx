import SubpageLayout from '../../components/common/SubpageLayout';
import { Circle } from 'lucide-react';

const HistoryPage = () => {
  const timeline = [
    { year: '2026', month: '01', title: '한국반려문화산업학회 창립', description: '경희대학교에서 학회 설립 및 창립총회 개최', highlight: true },
    { year: '2026', month: '01', title: '창립회원 모집 시작', description: '개인 및 기관 창립회원 모집 개시' },
    { year: '2026', month: '02', title: '창립기념 심포지엄', description: '창립총회 및 기념 학술 심포지엄 개최' },
    { year: '2026', month: '06', title: '제1회 정기 학술대회', description: '제1회 정기 학술대회 개최 예정' },
    { year: '2026', month: '하반기', title: '학회지 창간호 발간', description: '학회지 창간호 논문 투고 및 발간 예정' },
  ];

  return (
    <SubpageLayout title="연혁" subtitle="학회의 발자취를 소개합니다" sectionPath="/about">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-primary-100" />

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6 relative">
                <div className="flex-shrink-0 z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.highlight
                      ? 'bg-primary text-white'
                      : 'bg-white border-2 border-primary-200'
                  }`}>
                    {item.highlight ? (
                      <Circle className="w-4 h-4 fill-current" />
                    ) : (
                      <Circle className="w-3 h-3 text-primary-300" />
                    )}
                  </div>
                </div>
                <div className={`flex-1 pb-2 ${item.highlight ? '' : ''}`}>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-bold text-primary">{item.year}.{item.month}</span>
                  </div>
                  <h3 className={`text-lg font-bold mb-1 ${item.highlight ? 'text-primary' : 'text-gray-900'}`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default HistoryPage;
