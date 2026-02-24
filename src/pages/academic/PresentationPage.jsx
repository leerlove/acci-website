import SubpageLayout from '../../components/common/SubpageLayout';
import { Presentation, Calendar, Tag, FileText, Users, Send, Layers, Mail } from 'lucide-react';

const PresentationPage = () => {
  const event = {
    title: '제1회 반려문화산업 연구발표회',
    date: '2026년 하반기 예정',
    status: '준비중',
    desc: '반려동물 문화 및 산업 전반에 관한 학술 연구 성과를 공유하고, 현장 전문가와 연구자가 함께 소통하는 자리입니다.',
    topics: ['반려동물 복지', '반려산업 경제', '펫테크 & 디지털', '반려문화 교육', '정책 및 제도', '동물병원 경영'],
  };

  const guidelines = [
    {
      icon: Users,
      title: '발표 자격',
      items: ['학회 정회원 및 준회원', '관련 분야 연구자·대학원생', '현장 전문가 (산업계·정책 종사자)', '공동 연구의 경우 1인 이상 학회원 포함'],
    },
    {
      icon: FileText,
      title: '발표 형식',
      items: ['구두 발표: 발표 15분 + 질의응답 5분', 'A4 기준 초록 500자 이내 제출', '발표 자료(PPT) 사전 제출 필수', '포스터 발표 세션 별도 운영 예정'],
    },
    {
      icon: Send,
      title: '접수 방법',
      items: ['학회 공식 이메일로 초록 접수', '접수 양식은 공지사항에서 배포 예정', '심사 후 발표 확정 통보', '최종 논문 발표대회 심사 연계 가능'],
    },
    {
      icon: Layers,
      title: '발표 분야',
      items: ['반려동물 행동·복지 연구', '반려산업 경영·마케팅', '반려문화 정책·제도', '펫푸드·의료·용품 산업', '인간-동물 유대(HAB) 연구', '기타 반려문화 관련 분야'],
    },
  ];

  return (
    <SubpageLayout title="연구발표회" subtitle="연구발표회 일정 및 안내" sectionPath="/academic">
      <div className="space-y-8">

        {/* Introduction */}
        <div className="bg-gradient-to-br from-primary/5 to-secondary/10 rounded-2xl border border-primary/10 p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
              <Presentation className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">연구발표회란?</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-3">
            한국반려문화산업학회 연구발표회는 반려동물 문화·산업·복지 분야의 학술 연구 성과를 발표하고 토론하는 학술 행사입니다.
            연구자·전문가·실무자가 한자리에 모여 최신 연구 동향을 공유하며, 현장과 학문의 가교 역할을 합니다.
          </p>
          <p className="text-gray-600 leading-relaxed text-sm">
            발표된 우수 논문은 학회지 <strong>『반려문화산업연구』</strong> 게재 심사와 연계될 수 있으며,
            학술 네트워크 형성 및 산학 연계 기회를 제공합니다.
          </p>
        </div>

        {/* Event Listing */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            발표회 일정
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
            <div className="flex flex-wrap gap-2">
              {event.topics.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/5 text-primary text-xs font-medium rounded-full border border-primary/10"
                >
                  <Tag className="w-3 h-3" />
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Guidelines Grid */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            발표 안내
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {guidelines.map((g) => (
              <div key={g.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <g.icon className="w-4 h-4 text-primary" />
                  </div>
                  <h3 className="font-bold text-gray-900">{g.title}</h3>
                </div>
                <ul className="space-y-1.5">
                  {g.items.map((item) => (
                    <li key={item} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 bg-primary/50 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Note */}
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 flex items-start gap-3">
          <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">문의 및 접수</p>
            <p className="text-sm text-gray-600">
              발표 신청 및 관련 문의는 학회 공식 이메일{' '}
              <a href="mailto:kacci2025@gmail.com" className="text-primary font-medium hover:underline">
                kacci2025@gmail.com
              </a>
              로 연락해 주시기 바랍니다. 행사 일정 및 접수 안내는 공지사항을 통해 사전 안내됩니다.
            </p>
          </div>
        </div>

      </div>
    </SubpageLayout>
  );
};

export default PresentationPage;
