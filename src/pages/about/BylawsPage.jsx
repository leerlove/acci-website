import SubpageLayout from '../../components/common/SubpageLayout';
import { FileText, Download } from 'lucide-react';

const BylawsPage = () => {
  const keyArticles = [
    { num: '제1조', title: '명칭', content: '본 학회는 한국반려문화산업학회(Korean Association of Companion Culture and Industry, KACCI)라 한다.' },
    { num: '제2조', title: '목적', content: '본 학회는 반려문화 및 산업 전반에 관한 학제간 연구와 실천, 정책적 대안 제시를 통해 학문적 발전에 기여함을 목적으로 한다.' },
    { num: '제3조', title: '소재지', content: '본 학회의 사무소는 서울특별시 동대문구 경희대로 26, 경희대학교 네오르네상스관 332호에 둔다.' },
    { num: '제5조', title: '회원의 종류', content: '본 학회의 회원은 정회원(개인/기관), 평생회원(개인/기관), 일반회원, 기관회원으로 구분한다.' },
  ];

  return (
    <SubpageLayout title="정관" subtitle="학회의 정관을 안내합니다" sectionPath="/about">
      <div className="space-y-6">
        {/* Download section */}
        <div className="bg-gradient-soft rounded-2xl p-6 border border-primary/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">한국반려문화산업학회 정관 (전문)</h3>
              <p className="text-sm text-gray-500">PDF 파일로 전체 정관을 확인하실 수 있습니다.</p>
            </div>
          </div>
          <a
            href="/docs/한국반려문화산업학회_정관.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm flex-shrink-0"
          >
            <Download className="w-4 h-4 mr-2" />
            정관 다운로드
          </a>
        </div>

        {/* Key Articles */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">주요 조항 요약</h2>
          <div className="space-y-4">
            {keyArticles.map((article) => (
              <div key={article.num} className="p-4 border border-gray-100 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 bg-primary-50 text-primary text-xs font-bold rounded-full">
                    {article.num}
                  </span>
                  <h4 className="font-semibold text-gray-900">{article.title}</h4>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{article.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default BylawsPage;
