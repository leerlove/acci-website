import SubpageLayout from '../../components/common/SubpageLayout';
import { Database } from 'lucide-react';

const ResearchPage = () => {
  return (
    <SubpageLayout title="연구자료" subtitle="연구자료 다운로드" sectionPath="/resources">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <Database className="w-12 h-12 text-primary/30 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">연구자료 준비 중</h2>
        <p className="text-gray-500">연구자료가 등록되면 이곳에서 다운로드하실 수 있습니다.</p>
      </div>
    </SubpageLayout>
  );
};
export default ResearchPage;
