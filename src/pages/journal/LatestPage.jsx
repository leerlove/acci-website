import SubpageLayout from '../../components/common/SubpageLayout';
import { BookOpen } from 'lucide-react';

const LatestPage = () => {
  return (
    <SubpageLayout title="최신호" subtitle="학회지 최신호를 확인합니다" sectionPath="/journal">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <BookOpen className="w-12 h-12 text-primary/30 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">창간호 준비 중</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          학회지 창간호가 현재 준비 중입니다. 발간 일정은 공지사항을 통해 안내드리겠습니다.
        </p>
      </div>
    </SubpageLayout>
  );
};
export default LatestPage;
