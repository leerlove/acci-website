import SubpageLayout from '../../components/common/SubpageLayout';
import { Search } from 'lucide-react';

const SearchPage = () => {
  return (
    <SubpageLayout title="논문검색" subtitle="학회지 논문을 검색합니다" sectionPath="/journal">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <Search className="w-12 h-12 text-primary/30 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">논문검색 서비스 준비 중</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          학회지 창간호 발간 이후 논문검색 서비스를 제공할 예정입니다.
        </p>
      </div>
    </SubpageLayout>
  );
};
export default SearchPage;
