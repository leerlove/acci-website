import SubpageLayout from '../../components/common/SubpageLayout';
import { Shield } from 'lucide-react';

const EthicsPage = () => {
  const rules = [
    { title: '연구의 진실성', desc: '연구 데이터의 위조, 변조, 표절을 금지합니다.' },
    { title: '저자 표시', desc: '연구에 실질적으로 기여한 자만을 저자로 표시합니다.' },
    { title: '중복 게재 금지', desc: '이미 발표된 논문을 중복하여 투고할 수 없습니다.' },
    { title: '이해 충돌 공개', desc: '연구와 관련된 이해 충돌 사항을 공개해야 합니다.' },
    { title: '연구 대상 보호', desc: '인간 및 동물 대상 연구 시 윤리적 기준을 준수합니다.' },
    { title: '심사 윤리', desc: '심사위원은 공정하고 객관적으로 심사에 임합니다.' },
  ];

  return (
    <SubpageLayout title="연구윤리규정" subtitle="연구윤리에 관한 규정" sectionPath="/journal">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-bold text-gray-900">연구윤리규정</h2>
        </div>
        <p className="text-gray-600 mb-8 leading-relaxed">
          한국반려문화산업학회는 학술 연구의 윤리적 수행을 위해 다음의 연구윤리규정을 제정하여 시행합니다.
        </p>
        <div className="space-y-4">
          {rules.map((rule, i) => (
            <div key={i} className="flex gap-4 p-4 border border-gray-100 rounded-xl">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-primary">{i + 1}</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">{rule.title}</h4>
                <p className="text-sm text-gray-600">{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SubpageLayout>
  );
};
export default EthicsPage;
