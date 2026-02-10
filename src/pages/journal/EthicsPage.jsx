import { useState } from 'react';
import SubpageLayout from '../../components/common/SubpageLayout';
import { FileText, Download, ChevronDown, ChevronUp, Shield } from 'lucide-react';

const EthicsPage = () => {
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
        { num: '제1조', title: '목적', content: '본 한국반려문화산업학회(이하 "학회"라 칭함)의 연구윤리규정(이하 "본 규정"이라 칭함)은 학회 회원 및 논문 투고자에게 올바른 연구윤리 확립을 주지시켜 건전한 연구 환경과 학문 발전을 조성하는 데 목적이 있다.' },
        { num: '제2조', title: '연구자의 사회적 책임', content: '연구자는 본인의 연구가 반려문화산업과 사회 전반에 미치는 영향을 고려하여 사회적 책임의식을 바탕으로 연구 과정과 결과에 책임을 져야 한다.' },
        { num: '제3조', title: '타 연구에 대한 도덕성', content: '연구자는 타 연구자의 지적재산권을 침해하지 않고 연구의 정당성을 지켜야 한다.' },
      ]
    },
    {
      chapter: '제2장',
      title: '연구윤리위원회 구성',
      articles: [
        { num: '제4조', title: '위원회의 구성', content: '본 학회의 사무소는 아래 주소에 설치하고, 필요하다고 인정될 때에는 이사회의 결의로 이전 및 지부를 둘 수 있다.\n1. 연구윤리위원회(이하 "위원회"라 칭함)는 총 7명으로 구성하며, 위원장 1명, 위원 5명, 간사 1명을 둔다. 편집위원장은 당연직 위원으로 참석한다.\n2. 위원장은 학회장의 제청과 이사회의 승인을 받아 임명한다.\n3. 위원은 위원장의 제청과 이사회의 승인을 받아 임명하며, 간사는 위원 중 호선으로 선출한다.\n4. 위원장은 위원회의 의장으로서 필요 시 회의를 소집한다.' },
        { num: '제5조', title: '위원회의 임기', content: '위원 구성원의 임기는 2년이며, 연임이 가능하다.' },
      ]
    },
    {
      chapter: '제3장',
      title: '임원',
      articles: [
        { num: '제6조', title: '위원회의 주요 활동', content: '1. 연구논문 관련 위조, 변조, 표절, 중복게재, 중복연구, 부당한 저자 표시 등 연구윤리 위반 사항\n① 위조: 존재하지 않는 연구내용이나 데이터를 허위로 작성하는 행위\n② 변조: 연구 데이터의 고의적 변형 또는 삭제로 연구결과를 왜곡하는 행위\n③ 표절: 타인의 아이디어, 연구내용, 결과를 출처 없이 사용하는 행위\n④ 중복게재: 동일 연구를 여러 학술지에 중복 게재하는 행위\n⑤ 부당한 논문저자 표시: 연구 기여가 없는 자에게 저자 자격 부여 또는 기여자를 저자에서 제외하는 행위\n⑥ 중복연구: 동일한 연구결과를 두 개 이상의 연구 과제로 발표하는 행위\n⑦ 이중출판: 본 학회지에 게재된 논문을 타 곳에 출판 시 사전 허가 필요\n⑧ 기타 반려문화산업 분야 연구 윤리 범위를 심각하게 벗어난 행위\n2. 연구 진실성에 의문이 제기된 사항\n3. 위반 행위 검증 및 후속 조치 사항' },
        { num: '제7조', title: '위원회의 소집 및 심의', content: '1. 위원장은 연구윤리 위반 의혹이 접수되면 위원회를 소집하여 조사, 심의한다.\n2. 경미한 사안은 서면심의로 대체 가능하다.\n3. 위원회 성립은 재적 위원 과반수 출석, 의결은 출석 위원 과반수 찬성으로 한다.\n4. 조사 시 제보자, 피조사자, 증인, 참고인의 출석을 요구할 수 있다.' },
        { num: '제8조', title: '제보자 보호 및 비밀 유지', content: '1. 제보자의 신원은 철저히 비밀로 유지한다.\n2. 제보자에게 불이익이 발생하지 않도록 보호하고, 필요 시 원상회복 조치를 취한다.\n3. 위원회 구성원은 조사 과정에서 알게 된 정보를 외부에 누설해서는 안 된다.\n4. 공개 필요 시 위원회 의결과 위원장 결정 하에 진행 가능하다.' },
        { num: '제9조', title: '피조사자 권리 보호', content: '조사결과 확정 전까지 피조사자의 명예와 권리를 침해하지 않도록 하며, 무혐의 판정 시 명예회복 조치를 취한다.' },
        { num: '제10조', title: '통보 및 이의제기', content: '1. 조사 결과는 제보자와 피조사자에게 통보한다.\n2. 결과에 불복하는 경우 30일 이내에 이의 제기가 가능하며, 필요 시 재조사를 할 수 있다.' },
        { num: '제11조', title: '조사 기록 및 보고', content: '1. 조사 기록은 문서로 작성하여 5년간 보관한다.\n2. 조사 결과는 학회장 및 이사회에 보고한다.\n3. 기록에는 제보 내용, 조사 대상, 이의제기 내용, 심의 결과 및 근거자료, 위원 명단 등이 포함된다.' },
        { num: '제12조', title: '판정 후 조치', content: '1. 부정행위가 판명될 경우 위원회는 다음과 같은 처분을 취할 수 있다. 제명, 회원자격 박탈, 학술지 논문 삭제, 5년간 투고 금지, 학회 홈페이지 공지 등\n2. 필요한 경우 한국연구재단에 통보한다.\n3. 무혐의 판명 시 피조사자의 명예 회복을 위해 노력한다.\n4. 기타 미명시 규정은 사회통념에 따라 위원회가 결정한다.' },
        { num: '제13조', title: '시효', content: '징계 사유 발생일부터 1년 경과 시 징계할 수 없다.' },
        { num: '제14조', title: '행정 지원', content: '1. 연구윤리 규정 개정 절차는 학회 규정에 따른다.\n2. 학회는 위원회 운영에 필요한 행정 및 재정 지원을 제공한다.' },
        { num: '제15조', title: '연구자 동의', content: '본 학회지에 투고하는 자는 본 연구윤리규정을 승인하고 동의한 것으로 간주한다.' },
        { num: '제16조', title: '기타', content: '본 규정에 명시되지 않은 사항은 한국반려문화산업학회의 관례에 따른다.' },
      ]
    },
  ];

  return (
    <SubpageLayout title="연구윤리규정" subtitle="연구윤리에 관한 규정" sectionPath="/journal">
      <div className="space-y-6">
        {/* Download section */}
        <div className="bg-gradient-soft rounded-2xl p-6 border border-primary/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">한국반려문화산업학회 연구윤리규정 (전문)</h3>
              <p className="text-sm text-gray-500">텍스트 파일로 전체 연구윤리규정을 확인하실 수 있습니다.</p>
            </div>
          </div>
          <a
            href="/docs/한국반려문화산업학회_연구윤리규정.txt"
            download
            className="btn-primary text-sm flex-shrink-0"
          >
            <Download className="w-4 h-4 mr-2" />
            연구윤리규정 다운로드
          </a>
        </div>

        {/* Summary info bar */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-4">
          <p className="text-sm text-gray-600 text-center">
            <span className="font-semibold text-primary">2026년 1월 1일 제정</span>
            <span className="mx-3 text-gray-300">|</span>
            <span className="font-semibold text-gray-900">전체 3장 16조</span>
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
            {' '}본 규정은 2026년 1월 1일부터 시행한다.
          </p>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default EthicsPage;
