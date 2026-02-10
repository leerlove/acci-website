import SubpageLayout from '../../components/common/SubpageLayout';
import { Image } from 'lucide-react';

const GalleryPage = () => {
  return (
    <SubpageLayout title="갤러리" subtitle="학회 활동 사진" sectionPath="/resources">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
        <Image className="w-12 h-12 text-primary/30 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">갤러리 준비 중</h2>
        <p className="text-gray-500">학회 활동 사진이 등록되면 이곳에서 확인하실 수 있습니다.</p>
      </div>
    </SubpageLayout>
  );
};
export default GalleryPage;
