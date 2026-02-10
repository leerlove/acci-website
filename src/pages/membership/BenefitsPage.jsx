import SubpageLayout from '../../components/common/SubpageLayout';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Users, Award, FileText, Globe, GraduationCap, Handshake } from 'lucide-react';

const BenefitsPage = () => {
  const benefits = [
    { icon: BookOpen, title: '학술자료 열람', desc: '학회지 및 연구자료를 무료로 열람하실 수 있습니다.' },
    { icon: Calendar, title: '학술대회 참가', desc: '정기 학술대회 및 심포지엄에 할인된 등록비로 참가할 수 있습니다.' },
    { icon: Users, title: '네트워크 구축', desc: '반려문화 분야 전문가 네트워크에 참여할 수 있습니다.' },
    { icon: Award, title: '연구 지원', desc: '공동연구 및 학술대회 발표 기회를 제공받을 수 있습니다.' },
    { icon: FileText, title: '논문 투고', desc: '학회지에 연구 논문을 투고할 수 있습니다.' },
    { icon: Globe, title: '국제 교류', desc: '해외 학회 및 기관과의 교류 프로그램에 참여할 수 있습니다.' },
    { icon: GraduationCap, title: '교육 참여', desc: '학회 주관 교육 프로그램에 우선 참여할 수 있습니다.' },
    { icon: Handshake, title: '정책 참여', desc: '정책간담회 및 공론의 장에 참여할 수 있습니다.' },
  ];

  return (
    <SubpageLayout title="회원혜택" subtitle="회원에게 제공되는 다양한 혜택" sectionPath="/membership">
      <div className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-primary/30 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-gray-600">{benefit.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-soft rounded-2xl p-6 text-center border border-primary/10">
          <p className="text-gray-600 mb-4">회원가입을 통해 다양한 혜택을 누려보세요.</p>
          <Link to="/membership/guide" className="btn-primary">
            회원가입 안내 보기
          </Link>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default BenefitsPage;
