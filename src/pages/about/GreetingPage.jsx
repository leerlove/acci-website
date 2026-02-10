import SubpageLayout from '../../components/common/SubpageLayout';
import { Quote } from 'lucide-react';

const GreetingPage = () => {
  return (
    <SubpageLayout title="인사말" subtitle="한국반려문화산업학회를 찾아주셔서 감사합니다" sectionPath="/about">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Chairman photo */}
            <div className="flex-shrink-0">
              <img
                src="/images/chairman.png"
                alt="유광석 학회장"
                className="w-48 h-60 rounded-2xl object-cover shadow-md border border-gray-200"
              />
            </div>

            {/* Greeting text */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-6">
                <Quote className="w-8 h-8 text-primary/30" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                한국반려문화산업학회에 오신 것을 진심으로 환영합니다.
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  오늘날 반려문화(companion culture)는 인간과 인간의 관계뿐만 아니라, 동물, 식물, 로봇, 그리고 지구 그 자체와 같은 다양한 비인간 존재들과의 동반자적 관계성(companionship)에 대한 개인적 신념과 철학, 사회윤리와 책임, 그리고 국가 수준의 산업과 정책에 지대한 영향을 미치면서 새로운 문명패러다임을 창조하고 있습니다.
                </p>
                <p>
                  이러한 시대적 배경에서 한국반려문화산업학회는 급변하는 반려문화의 이론과 현실에 깊이 관계된 전문가들의 학문적, 정책적 및 산업적 연구성과를 공유하고, 나아가 이러한 전문가적 통찰력을 기초로 지속가능하고 호혜적인 반려시민문화의 정립과 확산에 기여하고자 합니다.
                </p>
                <p>
                  연구자, 활동가, 종교단체, 기업체, 공공기관 등 다양한 분야의 참신하고 역량 있는 회원들을 환영하며 각자의 영역에서 본 학회의 발전을 위해 고견과 충고를 주시기 바랍니다.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-1">한국반려문화산업학회 회장</p>
                <p className="text-primary font-bold text-lg">유 광 석 드림</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default GreetingPage;
