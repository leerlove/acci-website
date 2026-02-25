import SubpageLayout from '../../components/common/SubpageLayout';
import { Upload, CheckCircle, Download } from 'lucide-react';

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
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-4">투고 규정 요약</h2>
              <ul className="space-y-2">
                {[
                  '원고는 한글파일(hwp)로 작성, 외국어 논문은 MS Word(docx) 가능',
                  '글자 크기: 본문 11p, 각주·인용문단 9p / 줄 간격: 160%',
                  '장·절·항·목 번호: Ⅰ. → 1. → ①',
                  '국문초록 + 영문초록 각 1문단, 주제어 각 5개 이상 필수',
                  '원고 체제: 제목 → 저자 → 국문초록 → 본문 → 참고문헌 → 영문초록',
                  '본문 인용: (저자, 출판연도:페이지) 형식',
                  '참고문헌: 국문 → 중문 → 서양문헌 순 배열',
                  '표 제목은 <표 1> 형식으로 표 위에, 그림 제목은 [그림 1] 형식으로 그림 아래에 표기',
                  '투고 이메일: contact@kacci.or.kr',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-56 flex-shrink-0">
              <div className="bg-primary-50 rounded-xl border border-primary-100 p-5 text-center sticky top-28">
                <Download className="w-8 h-8 text-primary mx-auto mb-3" />
                <p className="font-semibold text-gray-900 text-sm mb-1">원고작성규정 전문</p>
                <p className="text-xs text-gray-500 mb-4">상세 규정을 확인하세요</p>
                <a
                  href="/downloads/원고작성규정.pdf"
                  download="원고작성규정.pdf"
                  className="inline-block w-full px-4 py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  PDF 다운로드
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
};
export default SubmissionPage;
