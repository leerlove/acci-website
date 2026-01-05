import React from 'react';
import { Link2, Users, MessageCircle, Heart, ArrowRight } from 'lucide-react';

const AboutSection = () => {
  const values = [
    {
      icon: Link2,
      title: '연결',
      titleEn: 'Connection',
      description: '반려인과 비반려인, 학계와 산업계, 시민단체와 정부기관 등 다양한 이해관계자를 연결합니다.',
      color: 'primary',
    },
    {
      icon: Users,
      title: '공존',
      titleEn: 'Coexistence',
      description: '인간과 반려동물, 반려식물, 반려로봇 등 비인간 주체들의 평화적 공존을 추구합니다.',
      color: 'secondary',
    },
    {
      icon: MessageCircle,
      title: '소통',
      titleEn: 'Communication',
      description: '열린 공론의 장을 통해 사회적 합의를 이끌어내고 갈등을 해소합니다.',
      color: 'primary-600',
    },
    {
      icon: Heart,
      title: '포용',
      titleEn: 'Inclusion',
      description: '실천적이고 포용적인 반려시민윤리를 정립하여 모두가 함께하는 사회를 만듭니다.',
      color: 'secondary-dark',
    },
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary text-sm font-semibold rounded-full mb-4">
            학회 소개
          </span>
          <h2 className="section-title">
            반려시민윤리로 여는<br className="sm:hidden" />
            <span className="text-gradient">평화적 공존</span>의 시대
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            한국반려문화산업학회는 반려문화 및 산업 전반에 관한 학제간 연구와 실천,
            정책적 대안 제시를 통해 학문적 발전에 기여합니다.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-soft rounded-3xl p-8 md:p-12 mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">우리의 미션</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                지속 가능한 반려산업의 미래를 연구하고, 인간과 비인간 반려주체들이
                평화롭게 공존하는 사회를 만들어가는 학술 플랫폼입니다.
              </p>
              <a href="#purpose" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                설립목적 자세히 보기
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <blockquote className="text-lg text-gray-700 italic border-l-4 border-primary pl-4">
                "반려시민윤리로 여는 평화적 공존의 시대,<br />
                지속 가능한 반려산업의 미래를 연구"
              </blockquote>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">핵심 가치</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="card card-hover group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-14 h-14 rounded-xl bg-${value.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <value.icon className={`w-7 h-7 text-${value.color}`} />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{value.title}</h4>
                <span className="text-xs text-gray-400 uppercase tracking-wider mb-3 block">{value.titleEn}</span>
                <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Keywords */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">핵심 키워드</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['연결', '공존', '사람', '반려동물', '반려식물', '반려로봇', '학제간 연구', '시민윤리'].map((keyword) => (
              <span
                key={keyword}
                className="px-4 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-full hover:bg-primary-50 hover:text-primary transition-colors cursor-default"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
