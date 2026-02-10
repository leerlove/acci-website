import SubpageLayout from '../../components/common/SubpageLayout';
import { Crown, Users, Shield, BookOpen, Star } from 'lucide-react';

const OrganizationPage = () => {
  const orgData = {
    president: { title: '회장', count: '1명', icon: Crown },
    vicePresidents: { title: '부회장', count: '2명 내외', icon: Star },
    auditors: { title: '감사', count: '2명', icon: Shield },
    directors: [
      '학술이사', '연구이사', '총무이사', '대외협력이사', '산업이사', '편집이사'
    ],
    committees: [
      { name: '편집위원회', desc: '학회지 편집 및 발간' },
      { name: '학술연구위원회', desc: '학술대회 기획 및 운영' },
      { name: '연구윤리위원회', desc: '연구윤리 심의 및 관리' },
      { name: '국제협력위원회', desc: '해외 학회 및 기관 교류' },
    ],
  };

  return (
    <SubpageLayout title="조직도" subtitle="학회의 조직 구성을 소개합니다" sectionPath="/about">
      <div className="space-y-6">
        {/* President */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-3">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{orgData.president.title}</h3>
          <p className="text-sm text-gray-500">{orgData.president.count}</p>
        </div>

        {/* Vice Presidents & Auditors */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-3">
              <Star className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{orgData.vicePresidents.title}</h3>
            <p className="text-sm text-gray-500">{orgData.vicePresidents.count}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-3">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{orgData.auditors.title}</h3>
            <p className="text-sm text-gray-500">{orgData.auditors.count}</p>
          </div>
        </div>

        {/* Standing Directors */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-gray-900">상임이사 (10명 내외)</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {orgData.directors.map((dir) => (
              <div key={dir} className="px-4 py-3 bg-primary-50 rounded-xl text-center">
                <span className="text-sm font-medium text-primary">{dir}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Committees */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-gray-900">위원회</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {orgData.committees.map((committee) => (
              <div key={committee.name} className="p-4 border border-gray-100 rounded-xl hover:border-primary/30 transition-colors">
                <h4 className="font-semibold text-gray-900 mb-1">{committee.name}</h4>
                <p className="text-sm text-gray-500">{committee.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default OrganizationPage;
