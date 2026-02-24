import { useState } from 'react';
import { Search, ExternalLink, Info } from 'lucide-react';
import SubpageLayout from '../../components/common/SubpageLayout';

const FILTER_TABS = [
  { id: 'all', label: '전체' },
  { id: 'title', label: '제목' },
  { id: 'author', label: '저자' },
  { id: 'keyword', label: '키워드' },
];

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <SubpageLayout title="논문검색" subtitle="학회지 논문을 검색합니다" sectionPath="/journal">
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="논문 제목, 저자, 키워드로 검색"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              readOnly
            />
            <button
              type="button"
              className="flex items-center gap-2 px-5 py-3 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>검색</span>
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 mt-4">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
          <Search className="w-14 h-14 text-primary/20 mx-auto mb-5" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">검색 결과가 없습니다</h2>
          <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
            학회지 창간호 발간 후 논문검색 서비스가 제공됩니다.
            <br />
            발간 일정은 공지사항을 통해 안내드리겠습니다.
          </p>
        </div>

        {/* KCI Info Box */}
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
              <Info className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-blue-800 mb-1">KCI 한국학술지인용색인 연동 예정</h3>
              <p className="text-sm text-blue-700 leading-relaxed mb-3">
                향후 한국연구재단의 KCI(한국학술지인용색인) 시스템과 연동하여 논문 검색 및 인용 정보를
                제공할 예정입니다.
              </p>
              <a
                href="https://www.kci.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                KCI 바로가기
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </SubpageLayout>
  );
};

export default SearchPage;
