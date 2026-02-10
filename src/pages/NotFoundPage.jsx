import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-8xl font-bold text-gradient mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/" className="btn-primary">
            <Home className="w-4 h-4 mr-2" />
            홈으로 돌아가기
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            이전 페이지
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
