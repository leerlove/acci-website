import SubpageLayout from '../../components/common/SubpageLayout';
import { Quote } from 'lucide-react';

const GreetingPage = () => {
  return (
    <SubpageLayout title="인사말" subtitle="한국반려문화산업학회를 찾아주셔서 감사합니다" sectionPath="/about">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Photo placeholder */}
            <div className="flex-shrink-0">
              <div className="w-48 h-60 bg-gradient-soft rounded-2xl flex items-center justify-center border border-gray-100">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-3xl text-primary font-bold">회</span>
                  </div>
                  <p className="text-sm text-gray-400">회장 사진</p>
                </div>
              </div>
            </div>

            {/* Greeting text */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-6">
                <Quote className="w-8 h-8 text-primary/30" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                함께 사는 내일을 연구하는<br />
                <span className="text-gradient">한국반려문화산업학회</span>에 오신 것을 환영합니다.
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  안녕하십니까. 한국반려문화산업학회 회장입니다.
                </p>
                <p>
                  우리 사회에서 반려동물, 반려식물, 반려로봇 등 다양한 반려주체와의
                  공존은 이제 선택이 아닌 시대적 요청이 되었습니다.
                  한국반려문화산업학회는 이러한 시대적 변화에 학문적으로 응답하고자
                  2026년 1월 창립되었습니다.
                </p>
                <p>
                  본 학회는 반려문화 및 산업 전반에 관한 학제간 연구와 실천,
                  정책적 대안 제시를 통해 학문적 발전에 기여하고,
                  반려시민윤리의 정립과 확산을 목표로 합니다.
                </p>
                <p>
                  인간과 비인간 반려주체들이 평화롭게 공존하는 사회를 만들어가는 데
                  뜻을 함께하는 연구자, 실무자, 시민 여러분의 많은 관심과 참여를
                  부탁드립니다.
                </p>
                <p className="font-medium text-gray-800">
                  감사합니다.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-primary font-bold text-lg">한국반려문화산업학회 회장</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default GreetingPage;
