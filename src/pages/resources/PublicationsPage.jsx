import SubpageLayout from '../../components/common/SubpageLayout';
import { BookOpen, Clock, Bell, FileText, Archive } from 'lucide-react';

const publications = [
  {
    title: '학회지 <반려문화> 창간호',
    status: '준비중',
    expected: '2026년 하반기',
    category: '학회지',
    icon: FileText,
    desc: '한국반려문화산업학회의 첫 번째 학회지로, 반려문화 및 반려산업 관련 최신 연구 논문을 수록할 예정입니다.',
  },
  {
    title: 'KACCI 창립기념 자료집',
    status: '준비중',
    expected: '2026년',
    category: '자료집',
    icon: Archive,
    desc: '학회 창립을 기념하여 발간되는 자료집으로, 창립총회 및 초기 학술 활동 기록이 담길 예정입니다.',
  },
];

const PublicationsPage = () => {
  return (
    <SubpageLayout title="간행물" subtitle="학회 간행물 목록" sectionPath="/resources">
      <div className="space-y-6">
        {/* Header info card */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex gap-4">
          <BookOpen className="w-8 h-8 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="text-base font-bold text-gray-900 mb-1">간행물 안내</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              한국반려문화산업학회는 반려문화 및 반려산업 분야의 학술 발전을 위해 학회지와 연구 자료집을 발간할 예정입니다.
              현재 창간호 준비가 진행 중이며, 발간 시 학회 회원 여러분께 안내드립니다.
            </p>
          </div>
        </div>

        {/* Publication items */}
        <div className="space-y-4">
          {publications.map((pub, i) => {
            const Icon = pub.icon;
            return (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{pub.category}</span>
                      <h3 className="text-lg font-bold text-gray-900 mt-0.5">{pub.title}</h3>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-bold rounded-full bg-amber-100 text-amber-700 flex-shrink-0">
                    {pub.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{pub.desc}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4 text-primary/50" />
                  <span>발간 예정: <strong className="text-primary">{pub.expected}</strong></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notification note */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex gap-3 items-start">
          <Bell className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-500 leading-relaxed">
            간행물 발간 시 학회 홈페이지 공지사항 및 회원 이메일을 통해 안내드립니다.
            회원 가입 후 소식을 받아보실 수 있습니다.
          </p>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default PublicationsPage;
