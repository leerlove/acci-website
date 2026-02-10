import SubpageLayout from '../../components/common/SubpageLayout';
import { Link2, Users, MessageCircle, Heart, Target, Network, UserCheck, GraduationCap, Globe } from 'lucide-react';

const PurposePage = () => {
  const visionPoints = [
    {
      icon: Network,
      number: '첫째',
      title: '혼종공동체 연구',
      titleEn: 'Hybrid-Species Community Research',
      description: '한국반려문화산업학회는 미래사회에 출현할 새로운 혼종공동체(hybrid-species community)의 사회적 의미와 존재양식을 이론적 및 경험적으로 규명함으로써 문명적 변화에 체계적이고 적극적으로 대응하고자 한다. 무엇보다 인간중심주의적(anthropocentric) 과학주의에 의한 물질적 및 정신적 폐해를 비판적으로 성찰하고, 동식물에 제한된 생물학적 종(種)의 경계를 해체하고 극복함으로써 휴머노이드와 같은 기술문명적 생명체 전반을 포괄하는 반려적 관계성(companionship)의 정립을 추구한다.',
    },
    {
      icon: UserCheck,
      number: '둘째',
      title: '반려시민성 정립',
      titleEn: 'Companion Citizenship',
      description: '환경생태적 위기에 직면한 인류문명의 상황을 진지하게 인식하면서도 반려생명친화적 산업육성과 정책수립이 오로지 이익추구에 집착하는 산업자본주의나 정치이데올로기에 지배되지 않도록 인간과 비인간 존재들의 호혜적 행복을 향한 반려시민성(companion citizenship) 개념을 정립하고, 대중이 참여하고 공유할 수 있는 반려시민성 담론을 공론화한다.',
    },
    {
      icon: GraduationCap,
      number: '셋째',
      title: '전문가 양성',
      titleEn: 'Expert Training',
      description: '사물인터넷이나 스타링크를 통한 초연결기술에 기반하여 인간과 상호의존적 관계성을 지속적이고 무한으로 확장하는 비인간 개체들(가령, 반려동물, 반려식물, 반려로봇, 휴머노이드, AI 기반 플랫폼 등)에 대한 새로운 연구와 산업 분야에 종사하는 전문가를 체계적으로 양성하고, 본 학회에서 수집된 빅데이터를 활용하여 경험적 교육과 훈련의 기회를 제공한다.',
    },
    {
      icon: Globe,
      number: '끝으로',
      title: '네트워크 구축',
      titleEn: 'Network Building',
      description: '반려문화산업을 중심으로 한 국내외 인적 및 물적 네트워크를 구축하고, 정기적인 학술행사 및 박람회 개최를 통해 관련 연구자와 종사자들 간 빈번한 만남과 정보교류를 촉진하고자 한다.',
    },
  ];

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
          <p className="text-base text-gray-800 leading-relaxed">
            급격한 기술발전이 제시하는 과학적 유토피아와 인류의 종말을 위협하는 새로운 전쟁과 지구환경위기가 공존하는 현대사회에서 인간과 비인간 존재들 사이의 상호관계는 새로운 차원으로 진입하고 있다. 특히, 산업과 일상에서 동식물과 AI 기반 로봇들이 인간공동체에서 그 자신의 역할을 다양하게 부여받고, 나아가 인간과의 감정적 소통과 공감을 통해 존재론적 의미를 획득하면서 이제 인간공동체의 한 구성원으로 빠르게 성장하고 있다. 이에 본 학회는 다음과 같은 비전을 제시하고자 한다.
          </p>
        </div>
      </div>

      {/* Vision */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-10 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">비전 (Vision)</h2>
        <div className="space-y-6">
          {visionPoints.map((vision) => (
            <div key={vision.number} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <vision.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-primary text-white text-sm font-bold rounded-full">
                      {vision.number}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900">{vision.title}</h3>
                    <span className="text-xs text-gray-400 uppercase tracking-wider ml-auto">
                      {vision.titleEn}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {vision.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
