import { useState } from 'react';
import SubpageLayout from '../../components/common/SubpageLayout';
import { FileText, Download, ChevronDown, ChevronUp } from 'lucide-react';

const BylawsPage = () => {
  const [openChapters, setOpenChapters] = useState({});

  const toggleChapter = (chapterNum) => {
    setOpenChapters(prev => ({
      ...prev,
      [chapterNum]: !prev[chapterNum]
    }));
  };

  const chapters = [
    {
      chapter: '제1장',
      title: '총칙',
      articles: [
        { num: '제1조', title: '명칭', content: '본 학회는 한국반려문화산업학회(Korean Association of Companion Culture and Industry)라 정한다.' },
        { num: '제2조', title: '목적', content: '본 학회는 다음과 같은 목적을 가진다.\n1. 반려동물, 반려식물, 반려로봇 등 반려문화 및 산업 전반에 관한 학제간 연구와 실천 및 정책적 대안 제시를 통하여 학문적 발전에 기여한다.\n2. 반려인과 비반려인, 시민단체, 학계, 기업, 산업종사자 등 다양한 이해관계자 간의 소통과 협력을 촉진한다.\n3. 반려문화 및 산업에 관한 열린 공론의 장을 형성하여 사회적 이해 증진과 합의 및 갈등 해소에 기여한다.\n4. 인간과 비인간 반려주체들의 평화적 공존을 위한 시민문화를 정립하고, 실천적이고 포용적인 반려시민윤리증진 및 이를 기초로 한 반려산업 발전에 기여한다.' },
        { num: '제3조', title: '사업', content: '본 학회는 전조의 목적을 효율적으로 달성하기 위하여 다음과 같은 사업을 한다.\n1. 반려문화 전반에 걸친 학제간 연구 및 학술 활동 지원\n2. 회원의 연구결과 발표회, 학술회의, 심포지엄 및 정책간담회 개최\n3. 학술지 및 연구 간행물의 발간\n4. 국내외 학술단체, 산업체, 정부기관, 시민단체 등과의 제휴를 통한 공동사업 추진 및 학술교류 증진\n5. 인공지능 기반 반려문화산업에 대한 연구, 자문, 교육 및 정책개발\n6. 이해관계자 간 소통과 협력을 위한 공론의 장 운영 및 네트워크 구축\n7. 반려문화 인식 개선 및 대중적 확산을 위한 시민교육 및 홍보사업\n8. 기타 본 학회의 목적달성에 필요한 사업' },
        { num: '제4조', title: '사무소', content: '본 학회의 사무소는 서울특별시 동대문구 경희대로 26, 경희대학교 네오르네상스관 332호에 설치한다.' },
      ]
    },
    {
      chapter: '제2장',
      title: '회원',
      articles: [
        { num: '제5조', title: '회원의 종류 및 자격', content: '본 학회의 회원은 정회원, 평생회원, 일반회원, 기관회원으로 구분한다.\n• 정회원 연회비: 개인 5만원, 기관 10만원\n• 평생회원비: 개인 50만원, 기관 100만원' },
        { num: '제6조', title: '회원의 권리와 의무', content: '모든 회원은 학술대회, 연구발표회, 정책간담회 등에 참여할 수 있다. 정회원과 평생회원은 총회 의결 참여 및 선거권·피선거권을 가진다.' },
        { num: '제7조', title: '회원의 탈퇴', content: '회원은 학회사무국에 탈퇴서를 제출함으로써 자유롭게 탈퇴할 수 있다.' },
        { num: '제8조', title: '자격정지·상실과 제명', content: '2년 이상 회비 미납 시 휴면회원 처리, 3년 이상 미납 시 자격 상실. 학회 가해행위 시 집행이사회 의결로 제명 가능.' },
      ]
    },
    {
      chapter: '제3장',
      title: '임원',
      articles: [
        { num: '제9조', title: '임원의 종류와 정수', content: '1. 회장 1명\n2. 부회장 2명 내외\n3. 상임이사 10명 내외 (학술, 연구, 총무, 대외협력, 산업, 편집 등 분야별)\n4. 감사 2명\n5. 회장의 추대를 받은 고문' },
        { num: '제10조', title: '임원의 임기', content: '임원의 임기는 3년으로 하되, 집행이사회의 의결로 연임할 수 있다.' },
        { num: '제11조', title: '회장·부회장 및 감사의 직무', content: '회장은 본 학회를 대표하고 총회와 집행이사회의 의장이 되며 학회업무를 총괄한다.' },
      ]
    },
    {
      chapter: '제4장',
      title: '기관',
      articles: [
        { num: '제16조', title: '총회', content: '총회는 정기총회와 임시총회로 구분한다. 정기총회는 연례학술대회 중에 개최함을 원칙으로 한다.' },
        { num: '제17조', title: '집행이사회', content: '집행이사회는 회장, 부회장 및 상임이사로 구성되며 필요에 따라 회장이 소집한다.' },
        { num: '제18조', title: '위원회의 종류 및 구성', content: '1. 편집위원회\n2. 학술연구위원회\n3. 연구윤리위원회\n4. 국제협력위원회\n5. 기타 필요한 위원회' },
      ]
    },
    {
      chapter: '제5장',
      title: '재정',
      articles: [
        { num: '제22조', title: '경비', content: '본 학회의 경비는 회원의 회비, 후원 및 찬조금, 연구사업비, 저작권료 및 기타 수입으로 충당한다.' },
        { num: '제25조', title: '회계연도', content: '본회의 회계연도는 매년 6월 1일부터 익년 5월 말일까지로 한다.' },
      ]
    },
    {
      chapter: '제6장',
      title: '연구윤리',
      articles: [
        { num: '제27조', title: '연구윤리', content: '본 학회는 연구의 진실성과 연구자의 윤리성을 확보하기 위하여 연구윤리위원회를 둔다. 구성, 운영 및 연구부정행위에 대한 조사절차 등은 별도의 연구윤리규정으로 정한다.' },
      ]
    },
    {
      chapter: '제7장',
      title: '보칙',
      articles: [
        { num: '제28조', title: '정관의 변경', content: '정관을 개정하고자 할 때에는 이사회의 심의를 거쳐 총회에서 재적 정회원 및 평생회원 과반수의 출석과 출석회원 3분의 2 이상의 찬성으로 의결한다.' },
        { num: '제30조', title: '학회의 해산', content: '총회에서 재적 정회원 및 평생회원 3분의 2 이상의 찬성으로 의결한다. 잔여재산은 국가, 지방자치단체 또는 유사한 목적을 가진 비영리법인에 기증한다.' },
      ]
    },
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

        {/* Summary info bar */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-4">
          <p className="text-sm text-gray-600 text-center">
            <span className="font-semibold text-primary">2026년 1월 1일 제정</span>
            <span className="mx-3 text-gray-300">|</span>
            <span className="font-semibold text-gray-900">전체 7장 30조</span>
          </p>
        </div>

        {/* Chapters */}
        <div className="space-y-4">
          {chapters.map((chapter, idx) => {
            const isOpen = openChapters[idx] !== false; // default open
            return (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Chapter Header */}
                <button
                  onClick={() => toggleChapter(idx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-primary text-white text-sm font-bold rounded-lg">
                      {chapter.chapter}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">{chapter.title}</h3>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {/* Articles */}
                {isOpen && (
                  <div className="px-6 pb-6 space-y-4">
                    {chapter.articles.map((article) => (
                      <div key={article.num} className="p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 bg-primary-50 text-primary text-xs font-bold rounded-full">
                            {article.num}
                          </span>
                          <h4 className="font-semibold text-gray-900">{article.title}</h4>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                          {article.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Addendum */}
        <div className="bg-primary-50/30 rounded-2xl border border-primary/10 p-6">
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-primary">부칙 제1조 (시행일)</span>
            {' '}이 정관은 2026년 1월 1일부터 시행한다.
          </p>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default BylawsPage;
