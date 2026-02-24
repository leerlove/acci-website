import SubpageLayout from '../../components/common/SubpageLayout';
import { Landmark, Calendar, Tag, BookOpen, Users, MessageSquare, Mail } from 'lucide-react';

const PolicyPage = () => {
  const purposes = [
    {
      icon: BookOpen,
      title: '정책 연구',
      desc: '반려동물 관련 국내외 법령·제도·정책 현황을 분석하고 학술적 근거를 바탕으로 정책 방향을 탐구합니다.',
    },
    {
      icon: Users,
      title: '전문가 교류',
      desc: '정부·지자체·학계·산업계·동물보호단체 전문가들이 한자리에 모여 현안을 공유하고 협력 방안을 모색합니다.',
    },
    {
      icon: MessageSquare,
      title: '정책 제언',
      desc: '간담회를 통해 도출된 논의를 정책 제언서로 정리하여 관련 기관에 공식 제출하고 정책 개선에 기여합니다.',
    },
  ];

  const event = {
    title: '제1회 반려문화 정책간담회',
    date: '2026년 하반기 예정',
    status: '준비중',
    desc: '반려동물 문화·산업·복지 분야의 현안 정책을 논의하고, 학회 차원의 정책 제언 방향을 수립하는 첫 번째 공식 간담회입니다.',
    agenda: [
      '반려동물 등록 및 유실·유기 방지 정책 현황',
      '반려산업 자격·면허 제도 개선 논의',
      '반려동물 의료서비스 접근성 확대 방안',
      '펫티켓·공공장소 반려동물 동반 정책',
      '반려문화 교육 공적 지원 체계 구축',
      '기타 현안 정책 자유 토론',
    ],
  };

  return (
    <SubpageLayout title="정책간담회" subtitle="정책간담회 일정 및 안내" sectionPath="/academic">
      <div className="space-y-8">

        {/* Introduction */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/10 rounded-2xl border border-primary/10 p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Landmark className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">정책간담회란?</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-3">
            한국반려문화산업학회 정책간담회는 반려동물 관련 법령·제도·정책 현안을 학술적 시각으로 분석하고,
            정부·지자체·산업계·학계 전문가들과 함께 실질적인 정책 개선 방향을 모색하는 정책 토론의 장입니다.
          </p>
          <p className="text-gray-600 leading-relaxed text-sm">
            간담회에서 도출된 논의는 학회 공식 <strong>정책 제언서</strong>로 발간되며, 관련 정부 기관 및 지자체에 전달하여
            반려문화 정책 발전에 직접 기여합니다.
          </p>
        </div>

        {/* Purpose Cards */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            개최 목적
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {purposes.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-3">
                  <p.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Event Listing */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            간담회 일정
          </h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <span className="px-3 py-1 text-xs font-bold rounded-full bg-yellow-100 text-yellow-700">
                {event.status}
              </span>
              <span className="text-sm text-primary font-semibold">{event.date}</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{event.desc}</p>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">예정 안건</p>
            <div className="flex flex-wrap gap-2">
              {event.agenda.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/5 text-primary text-xs font-medium rounded-full border border-primary/10"
                >
                  <Tag className="w-3 h-3" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Note */}
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 flex items-start gap-3">
          <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">문의 및 참가 신청</p>
            <p className="text-sm text-gray-600">
              정책간담회 참가 신청 및 관련 문의는 학회 공식 이메일{' '}
              <a href="mailto:kacci2025@gmail.com" className="text-primary font-medium hover:underline">
                kacci2025@gmail.com
              </a>
              로 연락해 주시기 바랍니다. 정부·지자체·연구기관 관계자의 참여를 환영합니다.
            </p>
          </div>
        </div>

      </div>
    </SubpageLayout>
  );
};

export default PolicyPage;
