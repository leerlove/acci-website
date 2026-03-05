import SubpageLayout from '../../components/common/SubpageLayout';
import { Link } from 'react-router-dom';
import { UserPlus, CheckCircle, ArrowRight } from 'lucide-react';

const GuidePage = () => {
  const memberTypes = [
    {
      type: '정회원 (개인)',
      fee: '연 5만원',
      qualifications: [
        '교육기관 담당자',
        '박사학위 소지자 또는 박사과정 중인 자',
        '관련 기관 임원 또는 실무자',
        '석사학위 + 관련 분야 3년 이상 경력자',
      ],
    },
    {
      type: '정회원 (기관)',
      fee: '연 10만원',
      qualifications: ['반려문화 관련 기관 및 단체'],
    },
    {
      type: '평생회원 (개인)',
      fee: '50만원 (일시납)',
      qualifications: ['정회원(개인) 중 평생회비 납부자'],
    },
    {
      type: '평생회원 (기관)',
      fee: '100만원 (일시납)',
      qualifications: ['정회원(기관) 중 평생회비 납부 기관'],
    },
  ];

  const steps = [
    { num: '01', title: '자격 확인', desc: '회원 유형별 자격요건을 확인합니다.' },
    { num: '02', title: '가입 신청', desc: '온라인으로 가입신청서를 제출합니다.' },
    { num: '03', title: '심사 및 승인', desc: '이사회의 심사를 거쳐 승인됩니다.' },
    { num: '04', title: '회비 납부', desc: '승인 후 회비를 납부합니다.' },
  ];

  return (
    <SubpageLayout title="회원가입 안내" subtitle="회원가입 절차 및 자격 안내" sectionPath="/membership">
      <div className="space-y-8">
        {/* Member Types */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">회원 종류 및 자격</h2>
          <div className="space-y-4">
            {memberTypes.map((member) => (
              <div key={member.type} className="border border-gray-100 rounded-xl p-5 hover:border-primary/30 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h3 className="font-bold text-gray-900">{member.type}</h3>
                  <span className="inline-block px-3 py-1 bg-primary-50 text-primary text-sm font-bold rounded-full">
                    {member.fee}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {member.qualifications.map((q, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">가입 절차</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, i) => (
              <div key={step.num} className="relative text-center p-4">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">
                  {step.num}
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                <p className="text-sm text-gray-500">{step.desc}</p>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-2 w-5 h-5 text-gray-300" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-soft rounded-2xl p-8 text-center border border-primary/10">
          <UserPlus className="w-10 h-10 text-primary mx-auto mb-3" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">회원가입 신청</h3>
          <p className="text-gray-600 mb-6">온라인으로 간편하게 가입 신청하세요.</p>
          <Link to="/membership/apply" className="btn-primary">
            <UserPlus className="w-4 h-4 mr-2" />
            신청하기
          </Link>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default GuidePage;
