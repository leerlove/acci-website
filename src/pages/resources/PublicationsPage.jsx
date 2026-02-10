import SubpageLayout from '../../components/common/SubpageLayout';
import { BookOpen } from 'lucide-react';

const PublicationsPage = () => {
  return (
    <SubpageLayout title="간행물" subtitle="학회 간행물 목록" sectionPath="/resources">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <BookOpen className="w-12 h-12 text-primary/30 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">간행물 준비 중</h2>
        <p className="text-gray-500">학회지 및 간행물이 발간되면 이곳에서 확인하실 수 있습니다.</p>
      </div>
    </SubpageLayout>
  );
};
export default PublicationsPage;
