import SubpageLayout from '../../components/common/SubpageLayout';
import { FileText, Upload, CheckCircle } from 'lucide-react';

const SubmissionPage = () => {
  const steps = [
    { num: '1', title: '원고 작성', desc: '투고규정에 맞춰 원고를 작성합니다.' },
    { num: '2', title: '온라인 제출', desc: '이메일을 통해 원고를 제출합니다.' },
    { num: '3', title: '심사', desc: '편집위원회의 심사를 거칩니다.' },
    { num: '4', title: '게재 결정', desc: '심사 결과에 따라 게재가 결정됩니다.' },
  ];

  return (
    <SubpageLayout title="투고안내" subtitle="논문 투고 절차 및 안내" sectionPath="/journal">
      <div className="space-y-6">
        <div className="bg-gradient-soft rounded-2xl p-6 border border-primary/10">
          <div className="flex items-center gap-3 mb-3">
            <Upload className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-gray-900">학회지 창간호 논문 모집</h3>
          </div>
          <p className="text-gray-600 text-sm">학회지 창간호 투고를 위한 논문을 모집합니다. 자세한 일정은 공지사항을 참고해 주세요.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">투고 절차</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step) => (
              <div key={step.num} className="text-center p-4 border border-gray-100 rounded-xl">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">{step.num}</div>
                <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">투고 규정 요약</h2>
          <ul className="space-y-2">
            {['원고는 한글 또는 영문으로 작성', '분량: 본문 기준 A4 20매 이내', '참고문헌 형식: APA 7th Edition 준수', '투고 시 연구윤리서약서 제출 필수', '투고 이메일: contact@kacci.or.kr'].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SubpageLayout>
  );
};
export default SubmissionPage;
