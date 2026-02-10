import SubpageLayout from '../../components/common/SubpageLayout';
import { Link2, Users, MessageCircle, Heart, Target, Eye } from 'lucide-react';

const PurposePage = () => {
  const values = [
    {
      icon: Link2,
      title: '연결',
      titleEn: 'Connection',
      description: '반려인과 비반려인, 학계와 산업계, 시민단체와 정부기관 등 다양한 이해관계자를 연결합니다.',
      details: '다학제적 접근을 통해 반려문화의 다양한 측면을 포괄적으로 연구하고, 이해관계자 간의 소통과 협력의 장을 마련합니다.',
    },
    {
      icon: Users,
      title: '공존',
      titleEn: 'Coexistence',
      description: '인간과 반려동물, 반려식물, 반려로봇 등 비인간 주체들의 평화적 공존을 추구합니다.',
      details: '종(種)의 경계를 넘어 모든 존재의 존엄성을 인정하고, 상호 공존의 윤리적 기반을 마련합니다.',
    },
    {
      icon: MessageCircle,
      title: '소통',
      titleEn: 'Communication',
      description: '열린 공론의 장을 통해 사회적 합의를 이끌어내고 갈등을 해소합니다.',
      details: '학술대회, 정책간담회, 시민포럼 등 다양한 소통 채널을 운영하여 반려문화에 대한 건설적 논의를 촉진합니다.',
    },
    {
      icon: Heart,
      title: '포용',
      titleEn: 'Inclusion',
      description: '실천적이고 포용적인 반려시민윤리를 정립하여 모두가 함께하는 사회를 만듭니다.',
      details: '반려인과 비반려인 모두를 아우르는 포용적 관점에서 반려시민윤리를 연구하고 교육합니다.',
    },
  ];

  return (
    <SubpageLayout title="설립목적 및 비전" subtitle="학회의 설립 목적과 비전을 소개합니다" sectionPath="/about">
      {/* Mission */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Target className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">설립목적 (Mission)</h2>
        </div>
        <div className="bg-gradient-soft rounded-xl p-6 border-l-4 border-primary">
          <p className="text-lg text-gray-800 font-medium leading-relaxed">
            "반려시민윤리로 여는 평화적 공존의 시대, 지속 가능한 반려산업의 미래를 연구"
          </p>
        </div>
        <p className="mt-6 text-gray-600 leading-relaxed">
          한국반려문화산업학회는 반려문화 및 산업 전반에 관한 학제간 연구와 실천,
          정책적 대안 제시를 통해 학문적 발전에 기여하고, 나아가 인간과 비인간
          반려주체들이 평화롭게 공존하는 사회를 만들어가는 것을 목적으로 합니다.
        </p>
      </div>

      {/* Vision */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center">
            <Eye className="w-6 h-6 text-secondary-dark" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">비전 (Vision)</h2>
        </div>
        <p className="text-lg text-gray-700 leading-relaxed">
          인간과 비인간 반려주체들이 평화롭게 공존하는 사회를 만들어가는 <strong className="text-primary">학술 플랫폼</strong>
        </p>
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          <div className="bg-primary-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">학제간</p>
            <p className="text-sm text-gray-600 mt-1">융합 연구</p>
          </div>
          <div className="bg-primary-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">정책</p>
            <p className="text-sm text-gray-600 mt-1">대안 제시</p>
          </div>
          <div className="bg-primary-50 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">실천</p>
            <p className="text-sm text-gray-600 mt-1">시민윤리 확산</p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">핵심 가치</h2>
        <div className="space-y-6">
          {values.map((value) => (
            <div key={value.title} className="flex gap-5 p-5 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <value.icon className="w-7 h-7 text-primary" />
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{value.title}</h3>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">{value.titleEn}</span>
                </div>
                <p className="text-gray-700 font-medium mb-1">{value.description}</p>
                <p className="text-sm text-gray-500">{value.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SubpageLayout>
  );
};

export default PurposePage;
