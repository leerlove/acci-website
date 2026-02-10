import SubpageLayout from '../../components/common/SubpageLayout';
import { Presentation } from 'lucide-react';

const PresentationPage = () => {
  return (
    <SubpageLayout title="연구발표회" subtitle="연구발표회 안내" sectionPath="/academic">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <Presentation className="w-12 h-12 text-primary/30 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">연구발표회 준비 중</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          연구발표회 일정은 학회 설립 후 순차적으로 공지될 예정입니다.
          공지사항을 통해 최신 소식을 확인해 주세요.
        </p>
      </div>
    </SubpageLayout>
  );
};
export default PresentationPage;
