import SubpageLayout from '../../components/common/SubpageLayout';
import { FileText } from 'lucide-react';

const PressPage = () => {
  return (
    <SubpageLayout title="보도자료" subtitle="언론 보도자료" sectionPath="/news">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <FileText className="w-12 h-12 text-primary/30 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">보도자료 준비 중</h2>
        <p className="text-gray-500">언론 보도자료가 등록되면 이곳에서 확인하실 수 있습니다.</p>
      </div>
    </SubpageLayout>
  );
};
export default PressPage;
