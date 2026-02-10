import { Link } from 'react-router-dom';
import { BookOpen, Users, FileText, Globe, Cpu, MessageSquare, GraduationCap, Building2, ArrowRight } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: BookOpen,
      title: '학제간 연구',
      description: '반려문화 전반에 걸친 다학제적 연구 및 학술 활동을 지원합니다.',
      items: ['학술지 발간', '연구총서 발간', '공동연구 지원'],
    },
    {
      icon: Users,
      title: '학술 활동',
      description: '다양한 학술 행사를 통해 연구 성과를 공유하고 교류합니다.',
      items: ['연례학술대회', '심포지엄', '연구발표회'],
    },
    {
      icon: FileText,
      title: '정책 제언',
      description: '반려문화 및 산업에 관한 정책적 대안을 제시합니다.',
      items: ['정책간담회', '정책보고서', '제도개선 연구'],
    },
    {
      icon: Globe,
      title: '네트워크 구축',
      description: '국내외 기관 및 단체와의 협력 네트워크를 구축합니다.',
      items: ['학술단체 제휴', '산업체 협력', '국제교류'],
    },
    {
      icon: Cpu,
      title: 'AI 반려문화 연구',
      description: '인공지능 기반 반려문화산업에 대한 연구와 자문을 수행합니다.',
      items: ['AI 연구', '기술자문', '정책개발'],
    },
    {
      icon: MessageSquare,
      title: '공론의 장',
      description: '이해관계자 간 소통과 협력을 위한 플랫폼을 운영합니다.',
      items: ['열린 토론회', '이해관계자 협의', '갈등 조정'],
    },
    {
      icon: GraduationCap,
      title: '시민 교육',
      description: '반려문화 인식 개선을 위한 시민교육 프로그램을 운영합니다.',
      items: ['시민강좌', '전문교육', '인식개선 캠페인'],
    },
    {
      icon: Building2,
      title: '산업 지원',
      description: '반려산업 종사자와 기업의 성장을 지원합니다.',
      items: ['산업 분석', '비즈니스 자문', '인력 양성'],
    },
  ];

  return (
    <section id="services" className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary-50 text-primary text-sm font-semibold rounded-full mb-4">
            주요 사업
          </span>
          <h2 className="section-title">
            학문적 발전과<br className="sm:hidden" />
            <span className="text-gradient">산업 성장</span>을 위하여
          </h2>
          <p className="section-subtitle mx-auto mt-4">
            한국반려문화산업학회는 8대 주요 사업을 통해
            반려문화와 산업의 지속 가능한 발전에 기여합니다.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all">
                <service.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{service.description}</p>
              <ul className="space-y-1.5">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="w-1 h-1 bg-secondary rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link to="/academic" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            학술활동 자세히 보기
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
