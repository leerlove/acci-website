import SubpageLayout from '../../components/common/SubpageLayout';
import { Newspaper } from 'lucide-react';

const NewsListPage = () => {
  return (
    <SubpageLayout title="학회소식" subtitle="학회의 최신 소식" sectionPath="/news">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <Newspaper className="w-12 h-12 text-primary/30 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">학회소식 준비 중</h2>
        <p className="text-gray-500">학회 설립 이후 활동 소식이 업데이트될 예정입니다.</p>
      </div>
    </SubpageLayout>
  );
};
export default NewsListPage;
