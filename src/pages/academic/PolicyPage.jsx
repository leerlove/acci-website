import SubpageLayout from '../../components/common/SubpageLayout';
import { Landmark } from 'lucide-react';

const PolicyPage = () => {
  return (
    <SubpageLayout title="정책간담회" subtitle="정책간담회 안내" sectionPath="/academic">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <Landmark className="w-12 h-12 text-primary/30 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">정책간담회 준비 중</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          반려문화 관련 정책 연구 및 제안을 위한 정책간담회가 준비 중입니다.
          일정이 확정되면 공지사항을 통해 안내드리겠습니다.
        </p>
      </div>
    </SubpageLayout>
  );
};
export default PolicyPage;
